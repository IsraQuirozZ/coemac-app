import ActivityCard from "@/components/dashboard/ActivityCard";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
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
  const [selectedFilter, setSelectedFilter] = useState("Todo");
  const [showOptions, setShowOptions]       = useState(false);
  const [loading, setLoading]               = useState(true);
  const [refreshing, setRefreshing]         = useState(false);
  const [actividad, setActividad]           = useState<any[]>([]);
  const [counts, setCounts]                 = useState({ referencias: 0, reuniones: 0, agradecimientos: 0 });

  const options = ["Todo", "Reuniones", "Referencias", "Agradecimientos"];

  const loadData = async () => {
    setLoading(true);
    const data = await getDashboardData();
    setCounts(data.counts);
    setActividad(data.recientes);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));

  const getCardData = (item: any) => {
    const formattedDate = new Date(item.fechaSort || Date.now()).toLocaleDateString("es-ES");
    switch (item.tipo) {
      case "referencia":
        return {
          personName: item.receptor ? `${item.receptor.nombre} ${item.receptor.apellido}` : "Sin especificar",
          detail: item.nombreContacto || "Sin contacto",
          formattedDate,
        };
      case "reunion":
        return {
          personName: item.invitado ? `${item.invitado.nombre} ${item.invitado.apellido}` : "Sin especificar",
          detail: item.fecha ? new Date(item.fecha).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) : "Sin fecha",
          formattedDate,
        };
      case "agradecimiento":
        return {
          personName: item.receptor ? `${item.receptor.nombre} ${item.receptor.apellido}` : "Sin especificar",
          detail: item.nombreContacto || "Sin contacto",
          formattedDate,
        };
      default:
        return { personName: "Desconocido", detail: "Sin detalles", formattedDate };
    }
  };

  const filteredActivity = actividad.filter((item) => {
    if (selectedFilter === "Todo")            return true;
    if (selectedFilter === "Referencias")     return item.tipo === "referencia";
    if (selectedFilter === "Reuniones")       return item.tipo === "reunion";
    if (selectedFilter === "Agradecimientos") return item.tipo === "agradecimiento";
    return true;
  });

  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" />
      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => setShowOptions(false)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} tintColor={colors.primary} />
        }
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>¡Hola Usuario!</Text>
          <Text style={globalStyles.containerDescription}>Resumen de actividad reciente.</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
        ) : (
          <>
            <View style={styles.dashboardCards}>
              <DashboardCard iconName="calendar-clear" value={counts.reuniones}       description="Reuniones"   lastDate="Hoy" />
              <DashboardCard iconName="heart"           value={counts.agradecimientos} description="GNC"         lastDate="Hoy" />
              <DashboardCard iconName="people-sharp"    value={counts.referencias}     description="Referencias" lastDate="Hoy" fullWidth />
            </View>

            {/* ── Cabecera actividad + botón informe ── */}
            <View style={styles.dashboardActivity}>
              <Text style={styles.dashboardActivityTitle}>Actividad Reciente</Text>
              {/* ← Navega al modal de informe con animación igual que los demás modals */}
              <Button
                label="+ Informe"
                variant="secondary"
                onPress={() => router.push("/(modals)/informe")}
              />
            </View>

            {/* Filtro */}
            <View style={styles.filterContainer}>
              <Text style={styles.filterLabel}>Filtro:</Text>
              <View style={styles.filterWrapper}>
                <TouchableOpacity style={styles.filterBox} onPress={() => setShowOptions(!showOptions)}>
                  <Text style={styles.filterText}>{selectedFilter}</Text>
                  <Ionicons name={showOptions ? "chevron-up" : "chevron-down"} size={18} />
                </TouchableOpacity>
                {showOptions && (
                  <View style={styles.dropdown}>
                    {options.map((opt) => (
                      <TouchableOpacity key={opt} style={styles.dropdownItem} onPress={() => { setSelectedFilter(opt); setShowOptions(false); }}>
                        <Text style={styles.dropdownText}>{opt}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* Cards */}
            <View style={styles.activityCards}>
              {filteredActivity.length === 0 ? (
                <Text style={{ color: colors.secondaryText, textAlign: "center" }}>No hay actividad para mostrar.</Text>
              ) : (
                filteredActivity.map((item, idx) => {
                  const { personName, detail, formattedDate } = getCardData(item);
                  return (
                    <ActivityCard
                      key={`${item.tipo}-${item.id || idx}`}
                      type={item.tipo}
                      personName={personName}
                      detail={detail}
                      date={formattedDate}
                      onPress={() => {
                        const route =
                          item.tipo === "referencia"    ? `/(modals)/referencias/${item.id}`    :
                          item.tipo === "reunion"       ? `/(modals)/reuniones/${item.id}`       :
                                                         `/(modals)/agradecimientos/${item.id}`;
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