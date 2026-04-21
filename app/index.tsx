import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { token } = useAuth();

  if (!token) return <Redirect href="/login" />;

  return <Redirect href="/(tabs)/dashboard" />;
}
