import { apiFetch } from "./apiClient";

export const getAgradecimientos = async (filters: Record<string, string> = {}) => {
  // Elimina valores undefined/null/vacíos para no mandar params sucios
  const clean = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined && v !== null && v !== "")
  );
  const query = new URLSearchParams(clean).toString();
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