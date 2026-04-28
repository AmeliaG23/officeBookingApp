import { Colors } from "@/constants/theme";
import { ActivityIndicator, useColorScheme } from "react-native";
import ThemedModal from "../themed-modal/themed-modal";
import { ThemedView } from "../themed-view/themed-view";

export const LoadingSpinner = ({ isVisible }: { isVisible: boolean }) => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color={theme.textPrimary}
        />
      </ThemedView>
    </ThemedModal>
  );
};
