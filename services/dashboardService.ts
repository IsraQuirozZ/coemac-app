import { apiFetch } from "./apiClient";

export const getDashboardData = async (
  period: "30d" | "year" = "30d",
  isAdmin = false,
) => {
  const enpoint = isAdmin
    ? `/dashboard/admin?period=${period}`
    : `/dashboard?period=${period}`;
  return apiFetch(enpoint);
};
