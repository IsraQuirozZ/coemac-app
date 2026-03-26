import Header from "@/components/layout/Header";
import ReferenceCard from "@/components/referencias/ReferenceCard";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import { globalStyles } from "@/styles/globals.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { referenciasStyles as styles } from "../../../styles/referencias.styles";

export default function Referencias() {
  const router = useRouter();
  const [direccion, setDireccion] = useState<"Recibidas" | "Enviadas">(
    "Recibidas",
  );
  const [tipo, setTipo] = useState<"Todas" | "Internas" | "Externas">("Todas");

  return (
    <View style={{ flex: 1 }}>
      <Header title="Referencias" />
      <ScrollView contentContainerStyle={globalStyles.container}>
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>Tus Referencias</Text>
          <Text style={globalStyles.containerDescription}>
            Registro de referencias recibidas y enviadas.
          </Text>
        </View>
        <View style={styles.filterContainer}>
          <FilterButton
            label="Recibidas"
            active={direccion === "Recibidas"}
            onPress={() => setDireccion("Recibidas")}
          />
          <FilterButton
            label="Enviadas"
            position="last"
            active={direccion === "Enviadas"}
            onPress={() => setDireccion("Enviadas")}
          />
        </View>
        <View style={styles.filterContainer}>
          <FilterButton
            label="Todas"
            active={tipo === "Todas"}
            onPress={() => setTipo("Todas")}
          />
          <FilterButton
            label="Internas"
            position="middle"
            active={tipo === "Internas"}
            onPress={() => setTipo("Internas")}
          />
          <FilterButton
            label="Externas"
            position="last"
            active={tipo === "Externas"}
            onPress={() => setTipo("Externas")}
          />
        </View>

        <View style={styles.referenceCards}>
          <ReferenceCard
            referrer="John Doe"
            employment="Company XYZ"
            number="123456789"
            member="Jane Smith"
            referenceType="Internal"
            date="2024-06-01"
            viewed={false}
          />
          <ReferenceCard
            referrer="John Doe"
            employment="Company XYZ"
            number="123456789"
            member="Jane Smith"
            referenceType="Internal"
            date="2024-06-01"
            viewed={false}
          />
          <ReferenceCard
            referrer="John Doe"
            employment="Company XYZ"
            number="123456789"
            member="Jane Smith"
            referenceType="Interna"
            date="2024-06-01"
            viewed={true}
          />
        </View>
      </ScrollView>
      <Button
        containerStyle={styles.addButton}
        label="Agregar Referencia"
        variant="add"
        onPress={() => router.push("/(modals)/crearReferencia")}
      />
    </View>
  );
}
