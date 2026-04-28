import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type ThemedViewProps = SafeAreaViewProps;

export const ThemedView = ({ style, ...props }: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <SafeAreaView
      style={[
        {
          backgroundColor: theme.surface,
          flex: 1,
          padding: 24,
          justifyContent: "center",
        },
        style,
      ]}
      {...props}
    />
  );
};
