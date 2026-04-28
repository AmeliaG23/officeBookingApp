import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedText } from "@/components/themed-text/themed-text";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user/use-user";
import { useRouter } from "expo-router";
import { StyleSheet, View, useColorScheme } from "react-native";
import ThemedModal from "../../../components/themed-modal/themed-modal";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    alignSelf: "center",
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
});

type LogoutModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

export default function LogoutModal({
  isVisible,
  setIsVisible,
}: LogoutModalProps) {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];
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
      <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
        Are you sure you want to log out?
      </ThemedText>
      <View style={styles.actions}>
        <ThemedButton onPress={onLogOutPressed} title={"Log Out"} />
        <ThemedButton
          onPress={() => setIsVisible(false)}
          title={"Cancel"}
          style={{
            backgroundColor: theme.statusDanger,
            borderColor: theme.statusDanger,
          }}
        />
      </View>
    </ThemedModal>
  );
}
