import FilterButton from "@/components/ui/FilterButton";
import HandlerIndicator from "@/components/ui/HandlerIndicator";
import SwipeActions from "@/components/ui/SwipeActions";
import { useAuth } from "@/context/AuthContext";
import { invalidateMembersCache } from "@/hooks/useMembers";
import { useToast } from "@/hooks/useToast";
import { getUsuarios, toggleActive } from "@/services/usuarioService";
import { colors } from "@/theme/colors";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { st } from "../../styles/manage-users.styles";

// ── Tipos ─────────────────────────────────────────────────────────────────────
interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  empresa: string | null;
  rol: "ADMIN" | "USER";
  activo: boolean;
}

// ── Card de usuario ───────────────────────────────────────────────────────────
const UsuarioCard = ({ item }: { item: Usuario }) => {
  const initials = `${item.nombre} ${item.apellido}`
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase();

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

          {/* Badge estado */}
          <View style={[st.rolBadge, item.activo && st.rolBadgeAdmin]}>
            <Text
              style={[st.rolBadgeText, item.activo && st.rolBadgeTextAdmin]}
            >
              {item.activo ? "Activo" : "Inactivo"}
            </Text>
          </View>
        </View>

        <Text style={st.cardEmail} numberOfLines={1}>
          {item.email}
        </Text>

        {item.empresa ? (
          <Text style={st.cardEmpresa} numberOfLines={1}>
            {item.empresa}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

// ── Pantalla principal ────────────────────────────────────────────────────────
export default function ManageUsers() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<"Todos" | "Activos" | "Inactivos">(
    "Todos",
  );

  // ── Filtrado ───────────────────────────────────────────────────────────────
  const filteredUsers = usuarios.filter((usuario) => {
    // ocultar usuario logeado
    if (usuario.id === user?.id) return false;

    if (filter === "Activos") return usuario.activo;

    if (filter === "Inactivos") return !usuario.activo;

    return true;
  });

  // ── Swipe refs ─────────────────────────────────────────────────────────────
  const swipeRefs = useRef<{ [key: string]: Swipeable | null }>({});
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

  // ── Fetch usuarios ─────────────────────────────────────────────────────────
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  // ── Toggle Active ──────────────────────────────────────────────────────────
  const handleToggleActive = (usuario: Usuario) => {
    if (usuario.rol === "ADMIN") {
      showToast("No puedes desactivar a un administrador", "error");

      swipeRefs.current[usuario.id]?.close();

      return;
    }

    const isActive = usuario.activo;

    Alert.alert(
      isActive ? "Confirmar desactivación" : "Confirmar activación",

      isActive
        ? `¿Desactivar a ${usuario.nombre} ${usuario.apellido}?`
        : `¿Activar a ${usuario.nombre} ${usuario.apellido}?`,

      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => swipeRefs.current[usuario.id]?.close(),
        },
        {
          text: isActive ? "Desactivar" : "Activar",
          style: isActive ? "destructive" : "default",

          onPress: async () => {
            try {
              await toggleActive(usuario.id);

              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );

              showToast(
                `${usuario.nombre} ${isActive ? "desactivado" : "activado"}`,
                "success",
              );

              swipeRefs.current[usuario.id]?.close();

              invalidateMembersCache();
              fetchData();
            } catch (error: any) {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

              showToast(error.message || "Error actualizando usuario", "error");
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
          if (openSwipeId) {
            swipeRefs.current[openSwipeId]?.close();
          }
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={st.headerText}>
          <Text style={st.title}>Administrar Usuarios</Text>

          <Text style={st.subtitle}>
            {filteredUsers.length} usuario
            {filteredUsers.length !== 1 ? "s" : ""} registrado
            {filteredUsers.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {/* Filters */}
        <View style={st.filterContainer}>
          <FilterButton
            label="Todos"
            active={filter === "Todos"}
            onPress={() => setFilter("Todos")}
          />

          <FilterButton
            label="Activos"
            position="middle"
            active={filter === "Activos"}
            onPress={() => setFilter("Activos")}
          />

          <FilterButton
            label="Inactivos"
            position="last"
            active={filter === "Inactivos"}
            onPress={() => setFilter("Inactivos")}
          />
        </View>

        {/* Content */}
        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : filteredUsers.length === 0 ? (
          <Text style={st.empty}>No hay usuarios registrados.</Text>
        ) : (
          <View style={st.list}>
            {filteredUsers.map((usuario) => (
              <SwipeActions
                key={usuario.id}
                id={usuario.id}
                onOpen={handleOpenSwipe}
                registerRef={registerSwipeRef}
                actions={[
                  {
                    label: usuario.activo ? "Desactivar" : "Activar",

                    icon: usuario.activo
                      ? "close-circle-outline"
                      : "checkmark-circle-outline",

                    color: usuario.activo ? colors.error : colors.primary,

                    onPress: () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                      handleToggleActive(usuario);
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
