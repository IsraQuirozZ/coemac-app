import { apiFetch } from "./apiClient";

export const getUsuarios = async () => {
  const res = await apiFetch("/usuarios");

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error fetching usuarios");
  }

  return res.json();
};
