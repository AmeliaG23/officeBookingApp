import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedTextInput } from "@/components/themed-text-input/themed-text-input";
import { ThemedText } from "@/components/themed-text/themed-text";
import { Colors } from "@/constants/theme";
import { useState } from "react";
import {
  AccessibilityInfo,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
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
  error: {
    marginTop: 16,
    alignSelf: "center",
  },
});

type UpdatePasswordModalProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

export default function UpdatePasswordModal({
  isVisible,
  setIsVisible,
}: UpdatePasswordModalProps) {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSendResetLinkPressed = () => {
    try {
      if (!email.trim()) {
        setError("Email is required");
        AccessibilityInfo.announceForAccessibility("Email is required");
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
      AccessibilityInfo.announceForAccessibility(
        "Failed to send password reset email. Please try again.",
      );
    }
  };

  return (
    <ThemedModal
      isVisible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
        Reset Password
      </ThemedText>
      <ThemedText style={{ color: theme.textPrimary }}>
        Enter your email to reset your password
      </ThemedText>
      <ThemedTextInput
        placeholder="Email"
        accessibilityLabel="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {error && (
        <ThemedText
          accessibilityRole="alert"
          aria-live="polite"
          style={[styles.error, { color: theme.statusDanger }]}
        >
          {error}
        </ThemedText>
      )}
      <View style={styles.actions}>
        <ThemedButton
          onPress={onSendResetLinkPressed}
          title={"Send Reset Link"}
        />
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

// https://bishwajeet-parhi.medium.com/i-built-an-auth-template-powered-by-react-native-and-appwrite-4a0b7ee90ba6
