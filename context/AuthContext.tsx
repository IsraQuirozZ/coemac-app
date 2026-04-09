import { setUnauthorizedHandler } from "@/services/apiClient";
import { decodeToken } from "@/utils/decodeToken";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getToken, removeToken, saveToken } from "../storage/authStorage";

// Tipo de usuario (ajustado a tu backend JWT)
type User = {
  userId: string;
  username: string;
  rol: string;
};

// Tipo del contexto
type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al iniciar app
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await getToken();

        if (storedToken) {
          setTokenState(storedToken);

          const decoded = decodeToken(storedToken);
          setUser({
            userId: decoded.userId,
            username: decoded.username,
            rol: decoded.rol,
          });
        }
      } catch (error) {
        console.error("Error loading session", error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  //  Login
  const login = async (newToken: string) => {
    try {
      await saveToken(newToken);
      setTokenState(newToken);

      const decoded = decodeToken(newToken);
      setUser({
        userId: decoded.userId,
        username: decoded.username,
        rol: decoded.rol,
      });
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await removeToken();
      setTokenState(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
      throw error;
    }
  };

  useEffect(() => {
    setUnauthorizedHandler(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🪝 Hook para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
