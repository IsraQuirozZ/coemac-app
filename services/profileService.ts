import { apiFetch } from "./apiClient";

// GET /usuarios/me — datos del usuario autenticado
export const getProfile = () => apiFetch("/usuarios/me");

// PUT /usuarios/me — actualiza los campos editables del perfil
export const updateProfile = (data: {
  nombre?:          string;
  apellido?:        string;
  username?:        string;
  empresa?:         string;
  telefono?:        string;
  fechaNacimiento?: string; // ISO8601
}) => apiFetch("/usuarios/me", { method: "PUT", body: JSON.stringify(data) });