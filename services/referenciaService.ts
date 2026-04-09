import { apiFetch } from "./apiClient";

export const getReferencias = async () => {
  const res = await apiFetch("/referencias");
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error fetching referencias");
  }

  return res.json();
};
