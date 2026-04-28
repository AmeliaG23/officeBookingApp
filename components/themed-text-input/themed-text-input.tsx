import { Colors } from "@/constants/theme";
import { TextInput, TextInputProps, useColorScheme } from "react-native";

export const ThemedTextInput = ({ style, ...props }: TextInputProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <TextInput
      style={[
        {
          borderWidth: 1,
          padding: 12,
          marginBottom: 16,
          borderRadius: 8,
          color: theme.textPrimary,
          borderColor: theme.border,
          backgroundColor: theme.surface,
        },
        style,
      ]}
      placeholderTextColor={theme.textMuted}
      {...props}
    />
  );
};
