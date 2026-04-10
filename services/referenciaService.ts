import { apiFetch } from "./apiClient";

export const getReferencias = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const url = query ? `/referencias?${query}` : "/referencias";

  const res = await apiFetch(url);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error fetching referencias");
  }

  return res.json();
};
