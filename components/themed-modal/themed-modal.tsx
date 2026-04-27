import { Colors } from "@/constants/theme";
import { Modal, View } from "react-native";

type ThemedModalProps = {
  isVisible: boolean;
  onRequestClose?: () => void;
  children: React.ReactNode;
};

export default function ThemedModal({
  isVisible,
  onRequestClose,
  children,
}: ThemedModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          padding: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 360,
            minHeight: 320,
            backgroundColor: Colors.light.background,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: Colors.blue.text,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
