import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/useToast";
import { createAgradecimiento, getAgradecimientos } from "@/services/agradeciminetoService";
import { useCallback, useEffect, useState } from "react";

export type FilterType = "Recibidos" | "Enviados";

export interface AgradecimientoItem {
  id: string;
  emisor:         { id: string; nombre: string };
  receptor:       { id: string; nombre: string };
  nombreContacto: string;
  importe:        number;
  createdAt:      string;
}

export const useAgradecimientos = () => {
  const { user } = useAuth();           // user.userId, user.username, user.rol
  const { showToast } = useToast();

  const [filter, setFilter]   = useState<FilterType>("Recibidos");
  const [data, setData]       = useState<AgradecimientoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.userId) return;
    setLoading(true);
    setError(null);
    try {
      const filtro = filter === "Recibidos" ? "recibidos" : "enviados";
      const res = await getAgradecimientos(filtro, user.userId);
      setData(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filter, user?.userId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const create = async (payload: {
    receptorId:     string;
    nombreContacto: string;
    importe:        number;
    referenciaId?:  string;
  }) => {
    await createAgradecimiento({ ...payload, emisorId: user!.userId });
    showToast("Agradecimiento registrado", "success");
    await fetchData(); // refresca la lista tras crear
  };

  return { data, loading, error, filter, setFilter, create };
};