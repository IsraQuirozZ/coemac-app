import { setUnauthorizedHandler } from "@/services/apiClient";
import { getMe } from "@/services/usuarioService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getToken, removeToken, saveToken } from "../storage/authStorage";

type User = {
  id: string;
  username: string;
  nombre: string;
  apellido: string;
  empresa?: string;
  email: string;
  telefono?: string;
  fechaNacimiento?: string;
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

          // const decoded = decodeToken(storedToken);
          // setUser({
          //   userId: decoded.userId,
          //   username: decoded.username,
          //   rol: decoded.rol,
          // });

          const user = await getMe();
          setUser(user);
        }
      } catch (error) {
        console.error("Error loading session", error);
        await logout();
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

      // const decoded = decodeToken(newToken);
      // setUser({
      //   userId: decoded.userId,
      //   username: decoded.username,
      //   rol: decoded.rol,
      // });
      const user = await getMe();
      if (!user) throw new Error("User not found");

      setUser(user);
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
