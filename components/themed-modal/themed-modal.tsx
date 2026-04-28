import { Colors } from "@/constants/theme";
import { Modal, View, useColorScheme } from "react-native";

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
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View
        accessibilityViewIsModal
        importantForAccessibility="yes"
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
          accessible
          style={{
            width: "100%",
            maxWidth: 360,
            minHeight: 320,
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
