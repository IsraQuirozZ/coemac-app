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

export const crearReferencia = async (data: any) => {
  const res = await apiFetch("/referencias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("Error response:", errorData);
    throw new Error(
      errorData.error || errorData.errors || "Error creating referencia",
    );
  }

  return res.json();
};
