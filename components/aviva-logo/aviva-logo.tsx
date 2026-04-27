import { Image } from "react-native";

export default function AvivaLogo() {
  return (
    <Image
      source={require("../../assets/images/aviva.webp")}
      style={{ width: 250, height: 250, alignSelf: "center" }}
    />
  );
}
