import { apiFetch } from "./apiClient";

export const getAgradecimientos = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const url = query ? `/agradecimientos?${query}` : "/agradecimientos";
  return apiFetch(url);
};

export const getAgradecimientoById = async (id: string) => {
  return apiFetch(`/agradecimientos/${id}`);
};

export const crearAgradecimiento = async (data: any) => {
  return apiFetch("/agradecimientos", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const actualizarAgradecimiento = async (id: string, data: any) => {
  return apiFetch(`/agradecimientos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const eliminarAgradecimiento = async (id: string) => {
  return apiFetch(`/agradecimientos/${id}`, {
    method: "DELETE",
  });
};
