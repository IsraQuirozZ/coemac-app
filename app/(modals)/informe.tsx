import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { getDashboardData } from "@/services/dashboardService";
import { globalStyles } from "@/styles/globals.styles";
import { informeStyles as st } from "@/styles/informe.styles";
import { colors } from "@/theme/colors";
import { buildHTML } from "@/utils/pdfTemplate";
import * as Print from "expo-print";
import { useLocalSearchParams } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { useAuth } = require("@/context/AuthContext");

// ─── helpers de vista ───────────────────────────────────────────────────────
const fmtDate = (d: any) =>
  d
    ? new Date(d).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const userName = (u: any) => (u ? `${u.nombre} ${u.apellido}` : "—");

// ─── Componentes reutilizables ───────────────────────────────────────────────
const Section = ({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) => (
  <View style={st.section}>
    <View style={st.sectionHeader}>
      <Text style={st.sectionTitle}>{title}</Text>
      <View style={st.badge}>
        <Text style={st.badgeText}>{count}</Text>
      </View>
    </View>
    {children}
  </View>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={st.row}>
    <Text style={st.rowLabel}>{label}</Text>
    <Text style={st.rowValue}>{value}</Text>
  </View>
);

const ItemCard = ({ children }: { children: React.ReactNode }) => (
  <View style={st.itemCard}>{children}</View>
);

// ─── PANTALLA PRINCIPAL ──────────────────────────────────────────────────────
export default function Informe() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { period } = useLocalSearchParams();
  const [exporting, setExporting] = useState(false);
  const [refs, setRefs] = useState<any[]>([]);
  const [reunions, setReunions] = useState<any[]>([]);
  const [agradecimientos, setAgradecimientos] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardData(
        (period as "30d" | "year") || "30d",
        user?.rol === "ADMIN",
      );
      setRefs(data.referencias || []);
      setReunions(data.reuniones || []);
      setAgradecimientos(data.agradecimientos || []);
      setMetrics(data.metrics || null);
      setLoading(false);
    };
    load();
  }, [period, user?.rol]);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html = buildHTML(
        refs,
        reunions,
        agradecimientos,
        period as "30d" | "year" | undefined,
        metrics,
      );
      const { uri } = await Print.printToFileAsync({ html, base64: false });
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Exportar informe",
      });
    } catch (e) {
      console.error("Error exportando PDF:", e);
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
        {/* Cabecera */}
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Informe de Actividad</Text>
          <Text style={globalStyles.containerDescription}>
            {period === "year"
              ? "Resumen completo del último año."
              : "Resumen completo de los últimos 30 días."}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* ── REFERENCIAS ── */}
            <Section title="Referencias" count={refs.length}>
              {refs.length === 0 ? (
                <Text style={st.empty}>Sin referencias.</Text>
              ) : (
                refs.map((r, i) => {
                  const isSent = r.emisorId === user?.id;

                  return (
                    <View key={i} style={st.itemCard}>
                      <Row
                        label={isSent ? "Para" : "De"}
                        value={userName(isSent ? r.receptor : r.emisor)}
                      />
                      <Row
                        label="Contacto referido"
                        value={r.nombreContacto || "—"}
                      />
                      <Row label="Tipo" value={r.tipo || "—"} />
                      <Row
                        label="Fecha"
                        value={fmtDate(r.fechaReferencia || r.createdAt)}
                      />
                    </View>
                  );
                })
              )}
            </Section>

            {/* ── REUNIONES ── */}
            <Section title="Reuniones" count={reunions.length}>
              {reunions.length === 0 ? (
                <Text style={st.empty}>Sin reuniones.</Text>
              ) : (
                reunions.map((r, i) => {
                  const isCreator = r.creadorId === user?.id;

                  return (
                    <ItemCard key={i}>
                      <Row
                        label="Con"
                        value={userName(isCreator ? r.invitado : r.creador)}
                      />
                      <Row
                        label="Fecha agendada"
                        value={fmtDate(r.fechaHora || r.fecha)}
                      />
                      <Row label="Estado" value={r.estado || "—"} />
                    </ItemCard>
                  );
                })
              )}
            </Section>

            {/* ── AGRADECIMIENTOS ── */}
            <Section title="Agradecimientos GNC" count={agradecimientos.length}>
              {agradecimientos.length === 0 ? (
                <Text style={st.empty}>Sin agradecimientos.</Text>
              ) : (
                agradecimientos.map((a, i) => {
                  const isSent = a.emisorId === user?.id;

                  return (
                    <ItemCard key={i}>
                      <Row
                        label={isSent ? "Para" : "De"}
                        value={userName(isSent ? a.receptor : a.emisor)}
                      />
                      <Row
                        label="Contacto negocio"
                        value={a.nombreContacto || "—"}
                      />
                      <Row
                        label="Importe"
                        value={
                          a.importe != null ? `${a.importe.toFixed(2)} €` : "—"
                        }
                      />
                      <Row
                        label="Fecha negocio"
                        value={fmtDate(a.fechaNegocio || a.createdAt)}
                      />
                    </ItemCard>
                  );
                })
              )}
            </Section>
          </>
        )}
      </KeyboardAwareScrollView>

      {/* Botón exportar PDF — fijo en la parte inferior */}
      {!loading && (
        <View style={st.footer}>
          <TouchableOpacity
            style={[st.exportBtn, exporting && { opacity: 0.7 }]}
            onPress={handleExportPDF}
            disabled={exporting}
            activeOpacity={0.85}
          >
            {exporting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={st.exportBtnText}>Generar PDF</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
