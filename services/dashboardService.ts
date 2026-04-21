import { getAgradecimientos } from "./agradeciminetoService";
import { getReferencias } from "./referenciaService";
import { getReuniones } from "./reunionService";

export const getDashboardData = async () => {
  try {
    const [refsRes, reunionsRes, agradecimientosRes] = await Promise.allSettled([
      // Referencias devuelve { data: [], pagination: {} } — necesita page y limit
      getReferencias({ page: "1", limit: "100" }),
      // Reuniones devuelve [] directamente
      getReuniones({ estado: "todas", page: "1", limit: "100" }),
      // Agradecimientos: SIN direction para traer todos (emisor+receptor del user autenticado)
      getAgradecimientos({ page: "1", limit: "100" }),
    ]);

    const extractArray = (res: PromiseSettledResult<any>, name: string): any[] => {
      if (res.status === "rejected") {
        console.warn(`⚠️ Error en ${name}:`, res.reason);
        return [];
      }
      const val = res.value;
      // Paginado → { data: [], pagination: {} }
      if (val && Array.isArray(val.data)) return val.data;
      // Array directo
      if (Array.isArray(val)) return val;
      return [];
    };

    const refs            = extractArray(refsRes,            "Referencias");
    const reunions        = extractArray(reunionsRes,         "Reuniones");
    const agradecimientos = extractArray(agradecimientosRes, "Agradecimientos");

    const actividadCompleta = [
      ...refs.map((i: any) => ({
        ...i, tipo: "referencia",
        fechaSort: new Date(i.fechaReferencia || i.createdAt || Date.now()),
      })),
      ...reunions.map((i: any) => ({
        ...i, tipo: "reunion",
        fechaSort: new Date(i.fecha || i.createdAt || Date.now()),
      })),
      ...agradecimientos.map((i: any) => ({
        ...i, tipo: "agradecimiento",
        fechaSort: new Date(i.fechaNegocio || i.createdAt || Date.now()),
      })),
    ];

    actividadCompleta.sort((a, b) => b.fechaSort.getTime() - a.fechaSort.getTime());

    return {
      counts: {
        referencias:     refs.length,
        reuniones:       reunions.length,
        agradecimientos: agradecimientos.length,
      },
      recientes: actividadCompleta.slice(0, 15),
    };
  } catch (error) {
    console.error("Error crítico en dashboard:", error);
    return { counts: { referencias: 0, reuniones: 0, agradecimientos: 0 }, recientes: [] };
  }
};