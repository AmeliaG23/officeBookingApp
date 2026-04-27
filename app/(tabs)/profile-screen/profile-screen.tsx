import LogoutModal from "@/app/modals/logout-modal/logout-modal";
import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedCard } from "@/components/themed-card/themed-card";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user/use-user";
import { useState } from "react";
import { View } from "react-native";
import UpdatePasswordModal from "../../modals/update-password-modal/update-password-modal";

const ProfileScreen = () => {
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
        <ThemedText
          style={{ fontSize: 24, fontWeight: "bold", alignSelf: "center" }}
        >
          Your Profile
        </ThemedText>
        <ThemedCard
          style={{ backgroundColor: Colors.light.background, marginBottom: 20 }}
        >
          <View style={{ flexDirection: "row", gap: 6 }}>
            <ThemedText>Name:</ThemedText>
            <ThemedText>{user?.name}</ThemedText>
          </View>
          <View style={{ flexDirection: "row", gap: 6, marginBottom: 12 }}>
            <ThemedText>Email:</ThemedText>
            <ThemedText>{user?.email}</ThemedText>
          </View>
          <ThemedButton
            onPress={onUpdatePasswordPressed}
            title={"Update Password"}
          />
        </ThemedCard>
        <View style={{ gap: 10 }}>
          <ThemedButton
            onPress={onLogOutPressed}
            title={"Logout"}
            style={{
              backgroundColor: Colors.red.background,
              borderColor: Colors.red.text,
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
