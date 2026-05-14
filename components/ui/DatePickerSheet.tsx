import { colors } from "@/theme/colors";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  value: Date;
  onConfirm: (date: Date) => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
};

export const DatePickerSheet = forwardRef<BottomSheet, Props>(
  ({ value, onConfirm, onOpenChange, title = "Selecciona una fecha" }, ref) => {
    const snapPoints = useMemo(() => ["48%"], []);
    const [tempDate, setTempDate] = useState(value);
    const [showAndroidPicker, setShowAndroidPicker] = useState(false);

    useEffect(() => {
      setTempDate(value);
    }, [value]);

    const handleSheetChange = (index: number) => {
      const isOpen = index >= 0;
      onOpenChange?.(isOpen);
      if (isOpen && Platform.OS === "android") {
        setShowAndroidPicker(true);
        setTimeout(() => {
          (ref as any)?.current?.close();
        }, 50);
      }
    };

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
      <>
        {Platform.OS === "android" && showAndroidPicker && (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowAndroidPicker(false);
              if (event.type === "set" && selectedDate) {
                // "set" = el usuario confirmó la fecha
                setTempDate(selectedDate);
                onConfirm(selectedDate);
                onOpenChange?.(false);
              } else {
                // "dismissed" = el usuario canceló
                onOpenChange?.(false);
              }
            }}
          />
        )}

        {/*iOS: BottomSheet con spinner de fecha */}
        {Platform.OS === "ios" && (
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
            backdropComponent={renderBackdrop}
            onChange={(index) => {
              onOpenChange?.(index >= 0);
            }}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>

              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                textColor={colors.primaryText}
                style={styles.picker}
                onChange={(_, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
              />

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => (ref as any)?.current?.close()}
                  style={styles.actionBtn}
                >
                  <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    onConfirm(tempDate);
                    (ref as any)?.current?.close();
                  }}
                  style={styles.actionBtn}
                >
                  <Text style={styles.confirmText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
        )}

        
        {Platform.OS === "android" && (
          <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={["1%"]}       // altura mínima — invisible
            enablePanDownToClose
            enableDynamicSizing={false}
            backgroundStyle={{ backgroundColor: "transparent" }}
            handleIndicatorStyle={{ backgroundColor: "transparent" }}
            onChange={handleSheetChange}
          >
            <View />
          </BottomSheet>
        )}
      </>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 8,
    marginBottom: 8,
    color: colors.primaryText,
  },
  picker: {
    alignSelf: "center",
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 24,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cancelText: {
    fontSize: 15,
    color: colors.secondaryText,
    fontWeight: "500",
  },
  confirmText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: "700",
  },
});