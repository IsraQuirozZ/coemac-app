import { useAuth } from "@/context/AuthContext";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  (
    {
      options,
      selected,
      onSelect,
      onOpenChange,
      title = "Selecciona un miembro",
    },
    ref,
  ) => {
    const { user } = useAuth();

    const snapPoints = useMemo(() => ["40%", "60%"], []);

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

    const filteredOption = useMemo(() => {
      return options.filter(
        (item) => item.id !== user?.id && item.rol !== "ADMIN",
      );
    }, [options, user?.id]);

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
        onChange={(index) => {
          onOpenChange?.(index >= 0);
        }}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          enableContentPanningGesture={true}
        >
          <Text style={styles.title}>{title}</Text>

          {filteredOption.map((item) => {
            const isSelected = selected?.id === item.id;

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
                    <Text style={{ color: "#fff" }}>
                      {item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </Text>
                  </View>
                  <Text
                    style={
                      isSelected
                        ? [styles.text, styles.textSelected]
                        : styles.text
                    }
                  >
                    {item.name}{" "}
                    <Text style={{ color: colors.secondaryText }}>
                      {" "}
                      - {item.company}
                    </Text>
                  </Text>
                </View>

                {isSelected && (
                  <Ionicons name="checkmark" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export const styles = StyleSheet.create({
  background: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    gap: 15,
    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // sombra Android
    elevation: 10,
  },
  handleIndicator: {
    width: 40,
    backgroundColor: "#ccc",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 80,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 8,
    marginVertical: 12,
    color: colors.primaryText,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 8,
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
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 12,
  },

  text: {
    fontSize: 15,
    color: colors.primaryText,
  },

  textSelected: {
    color: colors.primary,
    fontWeight: "600",
  },
});
