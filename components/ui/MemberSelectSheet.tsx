import { useAuth } from "@/context/AuthContext";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type MemberOption = {
  id: string;
  name: string;
  company: string;
  rol: "ADMIN" | "USER";
};

type Props = {
  options: MemberOption[];
  selected: MemberOption | null;
  onSelect: (value: MemberOption) => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
};

export const MemberSelectSheet = forwardRef<BottomSheet, Props>(
  ({ options, selected, onSelect, onOpenChange, title = "Selecciona un miembro" }, ref) => {
    const { user } = useAuth();

    const snapPoints = useMemo(() => ["50%"], []);

    const renderBackdrop = (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior="close"
        enableTouchThrough={false}
      />
    );

    const filteredOption = useMemo(
      () => options.filter((item) => item.id !== user?.id && item.rol !== "ADMIN"),
      [options, user?.id],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableHandlePanningGesture
        enableContentPanningGesture={false}  
        enableOverDrag={false}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        android_keyboardInputMode="adjustResize"
        onChange={(index) => onOpenChange?.(index >= 0)}
      >
        {/* ScrollView en lugar de BottomSheetScrollView
            En Android, BottomSheetScrollView tiene conflictos de gestos
            que bloquean el scroll. */}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={true}
          bounces={false}
          nestedScrollEnabled        
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{title}</Text>

          {filteredOption.length === 0 ? (
            <Text style={styles.empty}>No hay miembros disponibles.</Text>
          ) : (
            filteredOption.map((item) => {
              const isSelected = selected?.id === item.id;
              const initials = item.name
                .split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    onSelect(item);
                    (ref as any)?.current?.close();
                  }}
                  style={[styles.item, isSelected && styles.itemSelected]}
                >
                  <View style={styles.itemContent}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                    <Text
                      style={[styles.text, isSelected && styles.textSelected]}
                      numberOfLines={1}
                    >
                      {item.name}{" "}
                      <Text style={styles.company}>- {item.company}</Text>
                    </Text>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  handleIndicator: {
    width: 40,
    backgroundColor: "#ccc",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 8,
    marginVertical: 12,
    color: colors.primaryText,
  },
  empty: {
    textAlign: "center",
    color: colors.secondaryText,
    marginTop: 20,
    fontSize: 14,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemSelected: {
    backgroundColor: colors.soft,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  text: {
    fontSize: 15,
    color: colors.primaryText,
    flex: 1,
  },
  textSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
  company: {
    color: colors.secondaryText,
    fontWeight: "400",
  },
});