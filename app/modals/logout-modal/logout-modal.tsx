import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/themed-text/themed-text";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user/use-user";
import { useRouter } from "expo-router";
import { View } from "react-native";
import ThemedModal from "../../../components/themed-modal/themed-modal";

type LogoutModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

export default function LogoutModal({
  isVisible,
  setIsVisible,
}: LogoutModalProps) {
  const router = useRouter();
  const { logout } = useUser();

  const onLogOutPressed = () => {
    logout();
    setTimeout(() => {
      router.replace("/(auth)");
    }, 500);
  };
  return (
    <ThemedModal
      isVisible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <ThemedText
        style={{ fontSize: 20, fontWeight: "700", alignSelf: "center" }}
      >
        Are you sure you want to log out?
      </ThemedText>
      <View style={{ marginTop: 16, gap: 10 }}>
        <ThemedButton onPress={onLogOutPressed} title={"Log Out"} />
        <ThemedButton
          onPress={() => setIsVisible(false)}
          title={"Cancel"}
          style={{
            backgroundColor: Colors.red.background,
            borderColor: Colors.red.text,
          }}
        />
      </View>
    </ThemedModal>
  );
}
