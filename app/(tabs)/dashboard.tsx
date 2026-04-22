import ActivityCard from "@/components/dashboard/ActivityCard";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getDashboardData } from "@/services/dashboardService";
import { dashboardStyles as styles } from "@/styles/dashboard.styles";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {
  const { user } = useAuth();
  const nombre = user ? `${user.nombre}` : "Usuario";

  const [selectedFilter, setSelectedFilter] = useState("Todo");
  const [selectedPeriod, setSelectedPeriod] = useState<"30d" | "year">("30d");
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actividad, setActividad] = useState<any[]>([]);
  const [counts, setCounts] = useState({
    referencias: 0,
    reuniones: 0,
    agradecimientos: 0,
  });

  const [lastDates, setLastDates] = useState({
    referencias: null,
    reuniones: null,
    agradecimientos: null,
  });

  const options = ["Todo", "Reuniones", "Referencias", "Agradecimientos"];

  const loadData = async (period = selectedPeriod) => {
    if (!user) return;

    setLoading(true);
    const data = await getDashboardData(period, user?.rol === "ADMIN");

    setCounts(data.counts);
    setLastDates(data.lastDates);
    setActividad(data.recientes);

    setLoading(false);
  };

  useEffect(() => {
    loadData(selectedPeriod);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadData(selectedPeriod);
      }
    }, [selectedPeriod, user]),
  );

  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCardDate = (date?: string | null) => {
    if (!date) return "Sin actividad";

    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });
  };

  const filteredActivity = actividad.filter((item) => {
    if (selectedFilter === "Todo") return true;
    if (selectedFilter === "Referencias") return item.tipo === "referencia";
    if (selectedFilter === "Reuniones") return item.tipo === "reunion";
    if (selectedFilter === "Agradecimientos")
      return item.tipo === "agradecimiento";
    return true;
  });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" />
      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => setShowOptions(false)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>¡Hola {nombre}!</Text>
          <Text style={globalStyles.containerDescription}>
            Resumen de actividad reciente.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            <View style={styles.dashboardCards}>
              <DashboardCard
                iconName="calendar-clear"
                value={counts.reuniones}
                description="Reuniones"
                lastDate={formatCardDate(lastDates.reuniones)}
              />
              <DashboardCard
                iconName="heart"
                value={counts.agradecimientos}
                description="GNC"
                lastDate={formatCardDate(lastDates.agradecimientos)}
              />
              <DashboardCard
                iconName="people-sharp"
                value={counts.referencias}
                description="Referencias"
                lastDate={formatCardDate(lastDates.referencias)}
                fullWidth
              />
            </View>

            {/* ── Cabecera actividad + botón informe ── */}
            <View style={styles.dashboardActivity}>
              <Text style={styles.dashboardActivityTitle}>
                Actividad Reciente
              </Text>
              {/* ← Navega al modal de informe con animación igual que los demás modals */}
              <Button
                label="+ Informe"
                variant="secondary"
                onPress={() =>
                  router.push({
                    pathname: "/(modals)/informe",
                    params: { period: selectedPeriod },
                  })
                }
              />
            </View>

            {/* Filtro */}
            <>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedPeriod("30d")}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      selectedPeriod === "30d" ? colors.primary : "white",
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedPeriod === "30d" ? "white" : colors.primaryText,
                    }}
                  >
                    30 días
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedPeriod("year")}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor:
                      selectedPeriod === "year" ? colors.primary : "white",
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedPeriod === "year"
                          ? "white"
                          : colors.primaryText,
                    }}
                  >
                    1 año
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Filtro:</Text>
                <View style={styles.filterWrapper}>
                  <TouchableOpacity
                    style={styles.filterBox}
                    onPress={() => setShowOptions(!showOptions)}
                  >
                    <Text style={styles.filterText}>{selectedFilter}</Text>
                    <Ionicons
                      name={showOptions ? "chevron-up" : "chevron-down"}
                      size={18}
                    />
                  </TouchableOpacity>
                  {showOptions && (
                    <View style={styles.dropdown}>
                      {options.map((opt) => (
                        <TouchableOpacity
                          key={opt}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSelectedFilter(opt);
                            setShowOptions(false);
                          }}
                        >
                          <Text style={styles.dropdownText}>{opt}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </>

            {/* Cards */}
            <View style={styles.activityCards}>
              {filteredActivity.length === 0 ? (
                <Text
                  style={{ color: colors.secondaryText, textAlign: "center" }}
                >
                  No hay actividad para mostrar.
                </Text>
              ) : (
                filteredActivity.map((item, idx) => {
                  return (
                    <ActivityCard
                      type={item.tipo}
                      title={item.title}
                      detail={item.detail}
                      date={formattedDate(item.createdAt)}
                      onPress={() => {
                        const route =
                          item.tipo === "referencia"
                            ? `/(modals)/referencias/${item.id}`
                            : item.tipo === "reunion"
                              ? `/(modals)/reuniones/${item.id}`
                              : `/(modals)/agradecimientos/${item.id}`;

                        router.push(route as any);
                      }}
                    />
                  );
                })
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
