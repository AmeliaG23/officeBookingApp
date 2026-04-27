import { View, type ViewProps } from "react-native";

export const ThemedCard = ({ style, ...props }: ViewProps) => {
  return (
    <View
      style={[
        {
          padding: 20,
          justifyContent: "center",
        },
        style,
      ]}
      {...props}
    />
  );
};
