import { globalStyles } from "@/styles/globals.styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ActivityCard from "../../components/dashboard/ActivityCard";
import DashboardCard from "../../components/dashboard/DashboardCard";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import { dashboardStyles as styles } from "../../styles/dashboard.styles";
import { colors } from "../../theme/colors";

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("Todo");
  const [showOptions, setShowOptions] = useState(false);
  const options = ["Todo", "Reuniones", "Referencias", "Agradecimientos"];
  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" />

      <ScrollView
        contentContainerStyle={globalStyles.container}
        onScrollBeginDrag={() => setShowOptions(false)}
        keyboardShouldPersistTaps="always"
      >
        <View style={globalStyles.containerText}>
          <Text style={globalStyles.containerTitle}>¡Hola Usuario!</Text>
          <Text style={globalStyles.containerDescription}>
            Aquí tienes un resumen de tu actividad reciente.
          </Text>
        </View>

        <View style={styles.dashboardCards}>
          <DashboardCard
            iconName="calendar-clear"
            value={8}
            description="Reuniones"
            lastDate="18/03/2026"
          />
          <DashboardCard
            iconName="heart"
            value={3}
            description="GNC"
            lastDate="19/03/2026"
          />
          <DashboardCard
            iconName="people-sharp"
            value={25}
            description="Referencias"
            lastDate="12/03/2026"
            fullWidth
          />
        </View>

        <View style={styles.dashboardActivity}>
          <Text style={styles.dashboardActivityTitle}>Actividad Reciente</Text>
          <Button label="+ Informe" variant="secondary" />
        </View>

        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filtro:</Text>

          <View style={styles.filterWrapper}>
            <TouchableOpacity
              style={[
                styles.filterBox,
                showOptions && { borderColor: colors.light },
              ]}
              onPress={(e) => {
                e.stopPropagation();
                setShowOptions(!showOptions);
              }}
            >
              <Text style={styles.filterText}>{selectedFilter}</Text>

              <View style={styles.filterIcons}>
                <Ionicons
                  name={showOptions ? "chevron-up" : "chevron-down"}
                  size={18}
                />
              </View>
            </TouchableOpacity>
            {showOptions && (
              <View style={styles.dropdown}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedFilter(option);
                      setShowOptions(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.activityCards}>
          <ActivityCard
            type="referencia"
            personName="Carlos Lopéz"
            detail="Juan Pérez"
            date="12/03/2026"
          />
          <ActivityCard
            type="reunion"
            personName="Carlos Lopéz"
            detail="15:00"
            date="12/03/2026"
          />
          <ActivityCard
            type="agradecimiento"
            personName="Carlos Lopéz"
            detail="Contacto Tubería"
            date="12/03/2026"
          />
        </View>
      </ScrollView>
    </View>
  );
}
