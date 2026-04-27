import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ThemedView = ({ ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"] ?? Colors.light;

  return (
    <SafeAreaView
      style={{
        // backgroundColor: theme.background,
        flex: 1,
        padding: 24,
        justifyContent: "center",
      }}
      {...props}
    />
  );
};
