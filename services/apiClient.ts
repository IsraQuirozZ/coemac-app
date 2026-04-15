// const API_URL = "http://192.168.1.16:3000/api";
const API_URL = "http://192.168.1.137:3000/api";

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

  let data = null;
  // const text = await res.text();

  try {
    // data = text ? JSON.parse(text) : null;
    data = await res.json();
  } catch {
    // data = text;
    data = null;
  }

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(
      data?.message || data?.error || `Request failed (${res.status})`,
    );
  }

  return data;
};
