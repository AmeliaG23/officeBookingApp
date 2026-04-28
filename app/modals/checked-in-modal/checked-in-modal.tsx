import { ThemedButton } from "@/components/themed-button/themed-button";
import ThemedModal from "@/components/themed-modal/themed-modal";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { StyleSheet, useColorScheme } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
  },
});

type CheckedInModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function CheckedInModal({
  isVisible,
  onClose,
}: CheckedInModalProps) {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView>
        <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
          Checked In!
        </ThemedText>
        <ThemedButton title="Close" onPress={onClose} />
      </ThemedView>
    </ThemedModal>
  );
}
