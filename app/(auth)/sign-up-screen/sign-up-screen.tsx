import AvivaLogo from "@/components/aviva-logo/aviva-logo";
import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedCard } from "@/components/themed-card/themed-card";
import { ThemedTextInput } from "@/components/themed-text-input/themed-text-input";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user/use-user";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    alignSelf: "center",
  },
  error: {
    marginTop: 16,
    alignSelf: "center",
  },
  footerText: {
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "center",
  },
});

export default function SignUp() {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { signUp } = useUser();

  const onCreateAccountPressed = async () => {
    setError(null);
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("All fields are required");
      console.log("Name, email, password, and confirm password are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }

    try {
      await signUp(trimmedEmail, password, trimmedName);
      router.replace("/(tabs)/home-screen/home-screen");
    } catch (error) {
      setError("Error creating account");
      console.log("Error creating account -", error);
    }
  };

  const onSignInPressed = () => {
    router.dismissAll();
    router.replace("/(auth)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView>
        <AvivaLogo />
        <ThemedCard
          style={{
            ...styles.card,
            borderColor: theme.border,
            backgroundColor: theme.surfaceAlt,
          }}
        >
          <ThemedText style={[styles.title, { color: theme.textPrimary }]}>
            Sign up
          </ThemedText>
          <ThemedTextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <ThemedTextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <ThemedTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <ThemedTextInput
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {error && (
            <ThemedText style={[styles.error, { color: theme.statusDanger }]}>
              {error}
            </ThemedText>
          )}
          <ThemedButton
            title="Create Account"
            onPress={onCreateAccountPressed}
          />
        </ThemedCard>
        <ThemedText style={[styles.footerText, { color: theme.textPrimary }]}>
          Already have an account?
        </ThemedText>
        <ThemedButton title="Sign In" onPress={onSignInPressed} />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
