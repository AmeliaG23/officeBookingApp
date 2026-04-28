import { Colors } from "@/constants/theme";
import { Button, View, useColorScheme } from "react-native";

export const ThemedButton = ({
  title,
  style,
  ...props
}: {
  title: string;
  [key: string]: any;
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <View
      style={{
        padding: 2,
        backgroundColor: theme.statusWarning,
        borderRadius: 8,
        borderColor: theme.border,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 50,
        marginTop: 10,
        alignSelf: "center",
        alignContent: "center",
        ...style,
      }}
    >
      <Button title={title} color={theme.textPrimary} {...props} />
    </View>
  );
};
