type Member = {
  id: string;
  nombre: string;
  apellido: string;
  empresa?: string | null;
  rol: "ADMIN" | "USER";
};

export const mapMembersToOptions = (members: Member[]) => {
  return members.map((m) => ({
    id: m.id,
    name: `${m.nombre} ${m.apellido}`,
    company: m.empresa || "Sin empresa",
    rol: m.rol,
  }));
};
