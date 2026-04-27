import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedTextInput } from "@/components/themed-text-input/themed-text-input";
import { ThemedText } from "@/components/themed-text/themed-text";
import { Colors } from "@/constants/theme";
import { useState } from "react";
import { View } from "react-native";
import ThemedModal from "../../../components/themed-modal/themed-modal";

type UpdatePasswordModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

export default function UpdatePasswordModal({
  isVisible,
  setIsVisible,
}: UpdatePasswordModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSendResetLinkPressed = () => {
    try {
      if (!email.trim()) {
        setError("Email is required");
        console.log("Email is required");
        return;
      }
      // TODO: Add logic around reset password link
      console.log("Send reset link pressed");
      setIsVisible(false);
      setEmail("");
      setError(null);
    } catch (error) {
      console.log("Error sending password reset email -", error);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <ThemedModal
      isVisible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <ThemedText
        style={{ fontSize: 20, fontWeight: "700", alignSelf: "center" }}
      >
        Reset Password
      </ThemedText>
      <ThemedText>Enter your email to reset your password</ThemedText>
      <ThemedTextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {error && (
        <ThemedText
          style={{
            marginTop: 16,
            color: Colors.red.text,
            alignSelf: "center",
          }}
        >
          {error}
        </ThemedText>
      )}
      <View style={{ marginTop: 16, gap: 10 }}>
        <ThemedButton
          onPress={onSendResetLinkPressed}
          title={"Send Reset Link"}
        />
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

// https://bishwajeet-parhi.medium.com/i-built-an-auth-template-powered-by-react-native-and-appwrite-4a0b7ee90ba6
