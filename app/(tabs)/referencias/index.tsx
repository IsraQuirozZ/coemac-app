import Header from "@/components/layout/Header";
import ReferenceCard from "@/components/referencias/ReferenceCard";
import Button from "@/components/ui/Button";
import FilterButton from "@/components/ui/FilterButton";
import { globalStyles } from "@/styles/globals.styles";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { getReferencias } from "../../../services/referenciaService";
import { referenciasStyles as styles } from "../../../styles/referencias.styles";

export default function Referencias() {
  const router = useRouter();
  const [direccion, setDireccion] = useState<"Recibidas" | "Enviadas">(
    "Recibidas",
  );
  const [tipo, setTipo] = useState<"Todas" | "Internas" | "Externas">("Todas");

  const [referencias, setReferencias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const direction = direccion === "Recibidas" ? "recibidas" : "enviadas";

        const data = await getReferencias({
          direction,
          tipo,
          page: 1,
          limit: 10,
        });

        setReferencias(data.data);
        console.log("REFERENCIAS:", data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [direccion, tipo]);

  const mapReferenciaToCard = (ref: any) => {
    const isRecibida = direccion === "Recibidas";

    const member = isRecibida
      ? `${ref.emisor.nombre} ${ref.emisor.apellido}`
      : `${ref.receptor.nombre} ${ref.receptor.apellido}`;

    const label = isRecibida ? "De" : "Para";

    return {
      ...ref,
      member,
      label,
    };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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

        {loading ? (
          <ActivityIndicator color={colors.primary} />
        ) : referencias.length === 0 ? (
          <Text style={styles.noDataText}>
            No hay referencias para mostrar.
          </Text>
        ) : (
          <View style={styles.referenceCards}>
            {referencias.map((ref) => {
              const mappedRef = mapReferenciaToCard(ref);

              return (
                <ReferenceCard
                  key={ref.id}
                  referrer={ref.nombreContacto}
                  position={ref?.cargoContacto || "No especificado"}
                  number={ref?.telefonoContacto || "No especificado"}
                  email={ref?.emailContacto || "No especificado"}
                  member={mappedRef.member}
                  memberLabel={mappedRef.label}
                  referenceType={ref.tipo}
                  date={formatDate(ref.createdAt)}
                  viewed={false}
                />
              );
            })}
          </View>
        )}
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
