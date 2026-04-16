import { apiFetch } from "./apiClient";

export const getMe = async () => {
  return await apiFetch("/usuarios/me");
};

export const getUsuarios = async () => {
  return await apiFetch("/usuarios");
};
