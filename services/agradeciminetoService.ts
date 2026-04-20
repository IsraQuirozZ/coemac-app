import { apiFetch } from "./apiClient";

export const getAgradecimientos = async (filters = {}) => {
  const query = new URLSearchParams(filters as Record<string, string>).toString();
  const url = query ? `/agradecimientos?${query}` : "/agradecimientos";
  return apiFetch(url);
};

export const getAgradecimientoById = async (id: string) => {
  return apiFetch(`/agradecimientos/${id}`);
};

export const crearAgradecimiento = async (data: any) => {
  return apiFetch("/agradecimientos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const actualizarAgradecimiento = async (id: string, data: any) => {
  return apiFetch(`/agradecimientos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const eliminarAgradecimiento = async (id: string) => {
  return apiFetch(`/agradecimientos/${id}`, {
    method: "DELETE",
  });
};
