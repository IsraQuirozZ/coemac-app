import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { useAuth } from "@/context/AuthContext";
import { getDashboardData } from "@/services/dashboardService";
import { globalStyles } from "@/styles/globals.styles";
import { informeStyles as styles } from "@/styles/informe.styles";
import { colors } from "@/theme/colors";
import { buildEntityHTML } from "@/utils/pdfTemplateEntity";
import * as Print from "expo-print";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const fmtDate = (d: any) =>
  d
    ? new Date(d).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const userName = (u: any) => (u ? `${u.nombre} ${u.apellido}` : "—");

export default function InformeEntity() {
  const { user } = useAuth();
  const { type, period } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  const isAdmin = user?.rol === "ADMIN";

  const titles: Record<string, string> = {
    referencias: "Informe de Referencias",
    reuniones: "Informe de Reuniones",
    agradecimientos: "Informe de Agradecimientos",
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardData(
          (period as "30d" | "year") || "30d",
          isAdmin,
        );

        if (type === "referencias") {
          setItems(data.referencias || []);
        }

        if (type === "reuniones") {
          setItems(data.reuniones || []);
        }

        if (type === "agradecimientos") {
          setItems(data.agradecimientos || []);
        }

        setMetrics(data.metrics || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [type, period, isAdmin]);

  const handleExportPDF = async () => {
    try {
      setExporting(true);

      const entityType = Array.isArray(type) ? type[0] : type;

      const html = buildEntityHTML({
        type: entityType,
        items,
        period,
        metrics,
      });

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Exportar informe",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HandlerIndicator />

      <KeyboardAwareScrollView
        contentContainerStyle={globalStyles.formContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={30}
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>
            {titles[type as string] || "Informe"}
          </Text>
          <Text style={globalStyles.containerDescription}>
            Periodo: {period === "year" ? "Último año" : "Últimos 30 días"}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.metricsBox}>
              <Text style={styles.metricsTitle}>Resumen</Text>

              <Text style={styles.metricText}>
                Total registros: {items.length}
              </Text>

              {type === "agradecimientos" && (
                <Text style={styles.metricText}>
                  Importe total: {metrics?.totalImporte?.toFixed(2) || "0"} €
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{type}</Text>

              {items.length === 0 ? (
                <Text style={styles.empty}>No hay datos.</Text>
              ) : (
                items.map((item, idx) => (
                  <View key={idx} style={styles.itemCard}>
                    {type === "referencias" && (
                      <>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Emisor</Text>
                          <Text style={styles.rowValue}>
                            {userName(item.emisor)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Receptor</Text>
                          <Text style={styles.rowValue}>
                            {userName(item.receptor)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Contacto</Text>
                          <Text style={styles.rowValue}>
                            {item.nombreContacto || "—"}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Tipo</Text>
                          <Text style={styles.rowValue}>
                            {item.tipo || "—"}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Fecha</Text>
                          <Text style={styles.rowValue}>
                            {fmtDate(item.fechaReferencia || item.createdAt)}
                          </Text>
                        </View>
                      </>
                    )}

                    {type === "reuniones" && (
                      <>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Creador</Text>
                          <Text style={styles.rowValue}>
                            {userName(item.creador)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Invitado</Text>
                          <Text style={styles.rowValue}>
                            {userName(item.invitado)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Estado</Text>
                          <Text style={styles.rowValue}>
                            {item.estado || "—"}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Fecha</Text>
                          <Text style={styles.rowValue}>
                            {fmtDate(item.fechaHora || item.fecha)}
                          </Text>
                        </View>
                      </>
                    )}

                    {type === "agradecimientos" && (
                      <>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Emisor</Text>
                          <Text style={styles.rowValue}>
                            {userName(item.emisor)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Receptor</Text>
                          <Text style={styles.rowValue}>
                            {userName(item.receptor)}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Importe</Text>
                          <Text style={styles.rowValue}>
                            {item.importe?.toFixed(2) || "0"} €
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.rowLabel}>Fecha</Text>
                          <Text style={styles.rowValue}>
                            {fmtDate(item.fechaNegocio || item.createdAt)}
                          </Text>
                        </View>
                      </>
                    )}
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </KeyboardAwareScrollView>

      {!loading && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={handleExportPDF}
            disabled={exporting}
          >
            {exporting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.exportBtnText}>Generar PDF</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
