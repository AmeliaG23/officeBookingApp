import { Colors } from "@/constants/theme";
import { Text, TextProps } from "react-native";

export const ThemedText = ({ style, ...props }: TextProps) => {
  return (
    <Text
      style={[
        {
          marginBottom: 20,
          color: Colors.blue.text,
        },
        style,
      ]}
      {...props}
    />
  );
};
