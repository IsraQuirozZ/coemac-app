import { apiFetch } from "./apiClient";

export const getReferencias = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const url = query ? `/referencias?${query}` : "/referencias";

  return apiFetch(url);
};

export const getReferenciaById = async (id: string) => {
  return apiFetch(`/referencias/${id}`);
};

export const crearReferencia = async (data: any) => {
  return apiFetch("/referencias", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateReferencia = async (id: string, data: any) => {
  return apiFetch(`/referencias/${id}`, {
    method: "PUT",
    body: JSON.stringify({ ...data }),
  });
};

export const markReferenciaAsViewed = async (id: string) => {
  return apiFetch(`/referencias/${id}/view`, {
    method: "PATCH",
  });
};
