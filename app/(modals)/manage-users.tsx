import HandlerIndicator from "@/components/ui/HandlerIndicator";
import SwipeActions from "@/components/ui/SwipeActions";
import { useToast } from "@/hooks/useToast";
import { deleteUsuario, getUsuarios } from "@/services/usuarioService";
import { colors } from "@/theme/colors";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { st } from "../../styles/manage-users.styles";

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface Usuario {
  id:       string;
  nombre:   string;
  apellido: string;
  email:    string;
  empresa:  string | null;
  rol:      "ADMIN" | "USER";
  activo:   boolean;
}

// ── Card de usuario ───────────────────────────────────────────────────────────
const UsuarioCard = ({ item }: { item: Usuario }) => {
  const initials = `${item.nombre} ${item.apellido}`
    .split(" ").slice(0, 2).map((n) => n[0] || "").join("").toUpperCase();

  return (
    <View style={st.card}>
      {/* Avatar */}
      <View style={[st.avatar, item.rol === "ADMIN" && st.avatarAdmin]}>
        <Text style={st.avatarText}>{initials}</Text>
      </View>

      {/* Info */}
      <View style={st.cardContent}>
        <View style={st.cardHeader}>
          <Text style={st.cardName} numberOfLines={1}>
            {item.nombre} {item.apellido}
          </Text>
          {/* Badge de rol */}
          <View style={[st.rolBadge, item.rol === "ADMIN" && st.rolBadgeAdmin]}>
            <Text style={[st.rolBadgeText, item.rol === "ADMIN" && st.rolBadgeTextAdmin]}>
              {item.rol}
            </Text>
          </View>
        </View>
        <Text style={st.cardEmail} numberOfLines={1}>{item.email}</Text>
        {item.empresa
          ? <Text style={st.cardEmpresa} numberOfLines={1}>{item.empresa}</Text>
          : null}
      </View>
    </View>
  );
};

// Pantalla principal 
export default function ManageUsers() {
  const { showToast } = useToast();

  const [usuarios, setUsuarios]   = useState<Usuario[]>([]);
  const [loading, setLoading]     = useState(true);

  // Swipeable refs 
  const swipeRefs  = useRef<{ [key: string]: Swipeable | null }>({});
  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);

  const handleOpenSwipe = (id: string) => {
    if (openSwipeId && openSwipeId !== id) {
      swipeRefs.current[openSwipeId]?.close();
    }
    setOpenSwipeId(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const registerSwipeRef = (id: string, ref: Swipeable | null) => {
    swipeRefs.current[id] = ref;
  };

  // Carga de usuarios
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      showToast("Error cargando usuarios", "error");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchData(); }, []));

  // Eliminar con confirmación
  const handleDelete = (usuario: Usuario) => {
    if (usuario.rol === "ADMIN") {
      showToast("No puedes eliminar a un administrador", "error");
      swipeRefs.current[usuario.id]?.close();
      return;
    }

    Alert.alert(
      "Confirmar eliminación",
      `¿Eliminar a ${usuario.nombre} ${usuario.apellido}? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel", onPress: () => swipeRefs.current[usuario.id]?.close() },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUsuario(usuario.id);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              showToast(`${usuario.nombre} eliminado`, "success");
              swipeRefs.current[usuario.id]?.close();
              fetchData();
            } catch (error: any) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
              showToast(error.message || "Error al eliminar", "error");
            }
          },
        },
      ],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HandlerIndicator />

      <ScrollView
        contentContainerStyle={st.container}
        onScrollBeginDrag={() => {
          if (openSwipeId) swipeRefs.current[openSwipeId]?.close();
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabecera */}
        <View style={st.headerText}>
          <Text style={st.title}>Administrar Usuarios</Text>
          <Text style={st.subtitle}>
            {usuarios.length} usuario{usuarios.length !== 1 ? "s" : ""} registrado{usuarios.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : usuarios.length === 0 ? (
          <Text style={st.empty}>No hay usuarios registrados.</Text>
        ) : (
          <View style={st.list}>
            {usuarios.map((usuario) => (
              <SwipeActions
                key={usuario.id}
                id={usuario.id}
                onOpen={handleOpenSwipe}
                registerRef={registerSwipeRef}
                actions={[
                  {
                    label:   "Eliminar",
                    icon:    "trash-outline",
                    color:   colors.error,
                    onPress: () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      handleDelete(usuario);
                    },
                  },
                ]}
              >
                <UsuarioCard item={usuario} />
              </SwipeActions>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
