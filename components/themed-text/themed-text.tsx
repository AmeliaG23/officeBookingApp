import { Colors } from "@/constants/theme";
import { Text, TextProps, useColorScheme } from "react-native";

export const ThemedText = ({ style, ...props }: TextProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <Text
      style={[
        {
          marginBottom: 20,
          color: theme.textPrimary,
        },
        style,
      ]}
      {...props}
    />
  );
};
