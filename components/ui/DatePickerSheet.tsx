import { colors } from "@/theme/colors";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: Date;
  onConfirm: (date: Date) => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
};

export const DatePickerSheet = forwardRef<BottomSheet, Props>(
  ({ value, onConfirm, onOpenChange, title = "Selecciona una fecha" }, ref) => {
    const snapPoints = useMemo(() => ["45%"], []);
    const [tempDate, setTempDate] = useState(value);

    useEffect(() => {
      setTempDate(value);
    }, [value]);

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
        enableDynamicSizing={false}
        android_keyboardInputMode="adjustResize"
        backdropComponent={renderBackdrop}
        onChange={(index) => {
          onOpenChange?.(index >= 0);
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{title}</Text>

          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            textColor={colors.primaryText}
            style={{ alignSelf: "center" }}
            onChange={(_, selectedDate) => {
              if (selectedDate) setTempDate(selectedDate);
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => (ref as any)?.current?.close()}>
              <Text style={{ marginRight: 20 }}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onConfirm(tempDate);
                (ref as any)?.current?.close();
              }}
            >
              <Text style={{ color: colors.primary }}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
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

    // SOMBRE IOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    // SOMBRA ANDROID
    elevation: 10,
  },
  handleIndicator: {
    width: 40,
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 8,
    color: colors.primaryText,
  },
});
