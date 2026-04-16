// const API_URL = "http://192.168.1.16:3000/api";
//const API_URL = "http://192.168.1.137:3000/api";
const API_URL = "http://192.168.0.14:3000/api";

import { getToken } from "../storage/authStorage";

let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  let data;
  try {
    data = await res.json();
  } catch (error) {
    data = null;
  }

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(
      data?.errors?.[0] || data?.message || "Something went wrong",
    );
  }

  return data;
};
