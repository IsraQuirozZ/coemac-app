import { apiFetch } from "./apiClient";

export const getIncidencias = async () => {
  return apiFetch("/incidencias");
};

export const getIncidenciaById = async (id: string) => {
  return apiFetch(`/incidencias/${id}`);
};

export const crearIncidencia = async (data: any) => {
  return apiFetch("/incidencias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const actualizarEstadoIncidencia = async (id: string, data: any) => {
  return apiFetch(`/incidencias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const eliminarIncidencia = async (id: string) => {
  return apiFetch(`/incidencias/${id}`, {
    method: "DELETE",
  });
};