import Header from "@/components/layout/Header";
import ReunionCard from "@/components/reuniones/reunionCard";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import { globalStyles } from "@/styles/globals.styles";
import { reunionesStyles as styles } from "@/styles/reuniones.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────
export type FilterType = "Pasadas" | "Próximas";

// ─────────────────────────────────────────
// MOCK DATA — TODO: prisma.reunion.findMany({ where: { tipo: filter } })
// ─────────────────────────────────────────
const MOCK_PASADAS = [
  {
    id: "1",
    dia: "28",
    mes: "Feb",
    hora: "15:00",
    nombre: "Laura",
    empresa: "Empresa",
    descripcion:
      "Charla sobre contacto lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    dia: "28",
    mes: "Feb",
    hora: "15:00",
    nombre: "Laura",
    empresa: "Empresa",
    descripcion: "Charla sobre contacto",
  },
  {
    id: "3",
    dia: "28",
    mes: "Feb",
    hora: "15:00",
    nombre: "Laura",
    empresa: "Empresa",
    descripcion: "Charla sobre contacto",
  },
  {
    id: "4",
    dia: "28",
    mes: "Feb",
    hora: "15:00",
    nombre: "Laura",
    empresa: "Empresa",
    descripcion: "Charla sobre contacto",
  },
];

const MOCK_PROXIMAS = [
  {
    id: "5",
    dia: "15",
    mes: "Abr.",
    hora: "10:00",
    nombre: "Carlos",
    empresa: "TechCorp",
    descripcion: "Seguimiento proyecto",
  },
  {
    id: "6",
    dia: "22",
    mes: "Abr.",
    hora: "16:30",
    nombre: "Ana",
    empresa: "StartupX",
    descripcion: "Presentación propuesta",
  },
];

export default function Reuniones() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("Pasadas");

  const data = filter === "Pasadas" ? MOCK_PASADAS : MOCK_PROXIMAS;

  // TOGGLE DE DESCRIPCIÓN EN CARD
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Reuniones" />

      <ScrollView contentContainerStyle={globalStyles.container}>
        {/* Título y subtítulo */}
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Tus Reuniones</Text>
          <Text style={globalStyles.containerDescription}>
            Registro de tus reuniones propuestas.
          </Text>
        </View>

        {/* Filtros Pasadas / Próximas */}
        <View style={styles.filterContainer}>
          <FilterButton
            label="Pasadas"
            active={filter === "Pasadas"}
            onPress={() => {
              setFilter("Pasadas");
              setOpenCardId(null);
            }}
          />
          <FilterButton
            label="Próximas"
            position="last"
            active={filter === "Próximas"}
            onPress={() => {
              setFilter("Próximas");
              setOpenCardId(null);
            }}
          />
        </View>

        {/* Lista de cards */}
        <View style={globalStyles.formFields}>
          {data.map((item) => (
            <ReunionCard
              key={item.id}
              item={item}
              isOpen={openCardId === item.id}
              onToggle={() =>
                setOpenCardId((prev) => (prev === item.id ? null : item.id))
              }
            />
          ))}
        </View>
      </ScrollView>

      <Button
        containerStyle={styles.addButton}
        label="Agregar Reunión"
        variant="add"
        onPress={() => {
          router.push("/(modals)/crearReunion");
          setOpenCardId(null);
        }}
      />
    </View>
  );
}
