import HandlerIndicator from "@/components/ui/HandlerIndicator";
import { getDashboardData } from "@/services/dashboardService";
import { globalStyles } from "@/styles/globals.styles";
import { informeStyles as st } from "@/styles/informe.styles";
import { colors } from "@/theme/colors";
import { buildHTML } from "@/utils/pdfTemplate";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// ─── helpers de vista ───────────────────────────────────────────────────────
const fmtDate = (d: any) =>
  d ? new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const userName = (u: any) =>
  u ? `${u.nombre} ${u.apellido}` : "—";

// ─── Componentes reutilizables ───────────────────────────────────────────────
const Section = ({ title, count, children }: { title: string; count: number; children: React.ReactNode }) => (
  <View style={st.section}>
    <View style={st.sectionHeader}>
      <Text style={st.sectionTitle}>{title}</Text>
      <View style={st.badge}><Text style={st.badgeText}>{count}</Text></View>
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
  const [loading, setLoading]             = useState(true);
  const [exporting, setExporting]         = useState(false);
  const [refs, setRefs]                   = useState<any[]>([]);
  const [reunions, setReunions]           = useState<any[]>([]);
  const [agradecimientos, setAgradecimientos] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardData();
      setRefs(data.recientes.filter((i: any) => i.tipo === "referencia"));
      setReunions(data.recientes.filter((i: any) => i.tipo === "reunion"));
      setAgradecimientos(data.recientes.filter((i: any) => i.tipo === "agradecimiento"));
      setLoading(false);
    };
    load();
  }, []);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const html = buildHTML(refs, reunions, agradecimientos); // <-- Usamos la función importada
      const { uri } = await Print.printToFileAsync({ html, base64: false });
      await Sharing.shareAsync(uri, { mimeType: "application/pdf", dialogTitle: "Exportar informe" });
    } catch (e) {
      console.error("Error exportando PDF:", e);
    } finally {
      setExporting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HandlerIndicator />

      <KeyboardAwareScrollView contentContainerStyle={globalStyles.formContainer}>
        {/* Cabecera */}
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Informe de Actividad</Text>
          <Text style={globalStyles.containerDescription}>
            Resumen completo de referencias, reuniones y agradecimientos.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* ── REFERENCIAS ── */}
            <Section title="Referencias" count={refs.length}>
              {refs.length === 0
                ? <Text style={st.empty}>Sin referencias.</Text>
                : refs.map((r, i) => (
                  <ItemCard key={i}>
                    <Row label="Para"            value={userName(r.receptor)} />
                    <Row label="Contacto referido" value={r.nombreContacto || "—"} />
                    <Row label="Tipo"            value={r.tipo || "—"} />
                    <Row label="Fecha"           value={fmtDate(r.fechaReferencia || r.createdAt)} />
                  </ItemCard>
                ))
              }
            </Section>

            {/* ── REUNIONES ── */}
            <Section title="Reuniones" count={reunions.length}>
              {reunions.length === 0
                ? <Text style={st.empty}>Sin reuniones.</Text>
                : reunions.map((r, i) => (
                  <ItemCard key={i}>
                    <Row label="Con"            value={userName(r.invitado)} />
                    <Row label="Fecha agendada" value={fmtDate(r.fecha)} />
                    <Row label="Estado"         value={r.estado || "—"} />
                    <Row label="Descripción"    value={r.descripcion || "—"} />
                  </ItemCard>
                ))
              }
            </Section>

            {/* ── AGRADECIMIENTOS ── */}
            <Section title="Agradecimientos GNC" count={agradecimientos.length}>
              {agradecimientos.length === 0
                ? <Text style={st.empty}>Sin agradecimientos.</Text>
                : agradecimientos.map((a, i) => (
                  <ItemCard key={i}>
                    <Row label="Para"            value={userName(a.receptor)} />
                    <Row label="Contacto negocio" value={a.nombreContacto || "—"} />
                    <Row label="Importe"         value={a.importe != null ? `${a.importe.toFixed(2)} €` : "—"} />
                    <Row label="Fecha negocio"   value={fmtDate(a.fechaNegocio || a.createdAt)} />
                  </ItemCard>
                ))
              }
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
            {exporting
              ? <ActivityIndicator color="#fff" />
              : <Text style={st.exportBtnText}>📄 Generar PDF</Text>
            }
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}