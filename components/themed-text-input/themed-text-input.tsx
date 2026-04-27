import { Colors } from "@/constants/theme";
import { TextInput } from "react-native";

export const ThemedTextInput = ({ ...props }) => {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
        color: Colors.blue.text,
        borderColor: Colors.blue.text,
      }}
      placeholderTextColor={Colors.blue.text}
      {...props}
    />
  );
};
