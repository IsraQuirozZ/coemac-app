import { apiFetch } from "./apiClient";

export const getReuniones = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const url = query ? `/reuniones?${query}` : "/reuniones";

  return apiFetch(url);
};

export const getReunionById = async (id: string) => {
  return apiFetch(`/reuniones/${id}`);
};

export const crearReunion = async (data: any) => {
  return apiFetch("/reuniones", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const markReunionAsViewed = async (id: string) => {
  return apiFetch(`/reuniones/${id}/viewed`, {
    method: "PATCH",
  });
};

export const changeReunionStatus = async (
  id: string,
  estado: "REALIZADA" | "CANCELADA",
) => {
  return apiFetch(`/reuniones/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ estado }),
  });
};

export const deleteReunion = async (id: string) => {
  return apiFetch(`/reuniones/${id}`, {
    method: "DELETE",
  });
};
