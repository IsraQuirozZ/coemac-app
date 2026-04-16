import { apiFetch } from "./apiClient";

export const getReuniones = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const url = query ? `/reuniones?${query}` : "/reuniones";

  return apiFetch(url);
};
