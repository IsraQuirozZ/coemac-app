import Toast from "@/components/ui/Toast";
import { createContext, ReactNode, useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

type ToastState = {
  message: string;
  type: ToastType;
  visible: boolean;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type, visible: true });

    // auto-hide
    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <View style={{ flex: 1 }}>
        {children}

        {/* 👇 overlay global por encima de TODO */}
        {toast.visible && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Toast message={toast.message} type={toast.type} />
          </View>
        )}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
