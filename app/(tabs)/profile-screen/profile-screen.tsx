import LogoutModal from "@/app/modals/logout-modal/logout-modal";
import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedCard } from "@/components/themed-card/themed-card";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user/use-user";
import { useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import UpdatePasswordModal from "../../modals/update-password-modal/update-password-modal";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  card: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    gap: 6,
  },
  rowSpaced: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 12,
  },
  actions: {
    gap: 10,
  },
});

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const { user } = useUser();

  const onLogOutPressed = () => {
    setIsLogoutModalVisible(true);
  };

  const onUpdatePasswordPressed = () => {
    console.log("Update password pressed");
    setIsResetPasswordModalVisible(true);
  };

  return (
    <>
      <ThemedView>
        <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
          Your Profile
        </ThemedText>
        <ThemedCard
          style={{
            ...styles.card,
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: 12,
          }}
        >
          <View style={styles.row}>
            <ThemedText style={{ color: theme.textPrimary }}>Name:</ThemedText>
            <ThemedText style={{ color: theme.textPrimary }}>
              {user?.name}
            </ThemedText>
          </View>
          <View style={styles.rowSpaced}>
            <ThemedText style={{ color: theme.textPrimary }}>Email:</ThemedText>
            <ThemedText style={{ color: theme.textPrimary }}>
              {user?.email}
            </ThemedText>
          </View>
          <ThemedButton
            onPress={onUpdatePasswordPressed}
            title={"Update Password"}
          />
        </ThemedCard>
        <View style={styles.actions}>
          <ThemedButton
            onPress={onLogOutPressed}
            title={"Logout"}
            style={{
              backgroundColor: theme.statusDanger,
              borderColor: theme.statusDanger,
            }}
          />
        </View>
      </ThemedView>
      <LogoutModal
        isVisible={isLogoutModalVisible}
        setIsVisible={setIsLogoutModalVisible}
      />
      <UpdatePasswordModal
        isVisible={isResetPasswordModalVisible}
        setIsVisible={setIsResetPasswordModalVisible}
      />
    </>
  );
};

export default ProfileScreen;
