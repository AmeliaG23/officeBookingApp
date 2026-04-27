import { Colors } from "@/constants/theme";
import { ActivityIndicator } from "react-native";
import ThemedModal from "../themed-modal/themed-modal";
import { ThemedView } from "../themed-view/themed-view";

export const LoadingSpinner = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <ThemedModal isVisible={isVisible}>
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color={Colors.blue.text}
        />
      </ThemedView>
    </ThemedModal>
  );
};

// https://reactnative.dev/docs/activityindicator
