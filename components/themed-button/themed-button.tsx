import { Colors } from "@/constants/theme";
import { Button, View } from "react-native";

export const ThemedButton = ({
  title,
  ...props
}: {
  title: string;
  [key: string]: any;
}) => {
  return (
    <View
      style={{
        padding: 2,
        backgroundColor: Colors.yellow.tabIconDefault,
        borderRadius: 8,
        borderColor: Colors.blue.text,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 50,
        marginTop: 10,
        alignSelf: "center",
        alignContent: "center",
      }}
    >
      <Button title={title} color={Colors.blue.text} {...props} />
    </View>
  );
};
