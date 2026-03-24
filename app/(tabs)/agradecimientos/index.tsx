import AgradecimientoCard from "@/components/agradecimientos/agradecimientoCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import { agradecimientosStyles as styles } from "@/styles/agradecimientos.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
export type FilterType = "Recibidos" | "Enviados";

// ─────────────────────────────────────────
// MOCK DATA — TODO: prisma.agradecimiento.findMany({ where: { tipo: filter } })
// ─────────────────────────────────────────
const MOCK_RECIBIDOS = [
  {
    id: "1",
    usuario: "Usuario",
    motivo: "Contacto reparación tubería.",
    cantidad: 1500,
    fecha: "17 Mar 2026",
  },
  {
    id: "2",
    usuario: "Usuario",
    motivo: "Contacto reparación tubería.",
    cantidad: 1500,
    fecha: "17 Mar 2026",
  },
  {
    id: "3",
    usuario: "Usuario",
    motivo: "Contacto reparación tubería.",
    cantidad: 1500,
    fecha: "17 Mar 2026",
  },
  {
    id: "4",
    usuario: "Usuario",
    motivo: "Contacto reparación tubería.",
    cantidad: 1500,
    fecha: "17 Mar 2026",
  },
];

const MOCK_ENVIADOS = [
  {
    id: "5",
    usuario: "María G.",
    motivo: "Referencia cliente nuevo.",
    cantidad: 800,
    fecha: "15 Mar 2026",
  },
  {
    id: "6",
    usuario: "Carlos P.",
    motivo: "Cierre contrato anual.",
    cantidad: 3200,
    fecha: "10 Mar 2026",
  },
];

export default function Agradecimientos() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("Recibidos");

  const data = filter === "Recibidos" ? MOCK_RECIBIDOS : MOCK_ENVIADOS;

  return (
    <View style={{ flex: 1 }}>
      <Header title="Agradecimientos" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Título y subtítulo */}
        <View style={styles.headerText}>
          <Text style={styles.title}>Gracias Usuario!</Text>
          <Text style={styles.subtitle}>
            Registro de agradecimientos recibidos y enviados
          </Text>
        </View>

        {/* Filtros Recibidos / Enviados */}
        <View style={styles.filterContainer}>
          <FilterButton
            label="Recibidos"
            active={filter === "Recibidos"}
            onPress={() => setFilter("Recibidos")}
          />
          <FilterButton
            label="Enviados"
            position="last"
            active={filter === "Enviados"}
            onPress={() => setFilter("Enviados")}
          />
        </View>

        {/* Lista de cards */}
        <View style={styles.cards}>
          {data.map((item) => (
            <AgradecimientoCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <Button
        containerStyle={styles.addButton}
        label="Agregar Agradecimiento"
        variant="add"
        onPress={() => router.push("/(modals)/crearAgradecimiento")}
      />
    </View>
  );
}
