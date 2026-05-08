import AvivaLogo from "@/components/aviva-logo/aviva-logo";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedCard } from "@/components/themed-card/themed-card";
import { ThemedTextInput } from "@/components/themed-text-input/themed-text-input";
import { ThemedText } from "@/components/themed-text/themed-text";
import { ThemedView } from "@/components/themed-view/themed-view";
import { Colors } from "@/constants/theme";
import { useUser } from "@/hooks/use-user/use-user";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  AccessibilityInfo,
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
    alignSelf: "center",
  },
  error: {
    marginTop: 16,
    textAlign: "center",
  },
  footerText: {
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "center",
  },
});

export default function Index() {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, user, authChecked } = useUser();

  useEffect(() => {
    if (authChecked && user) {
      router.replace("/(tabs)/home-screen/home-screen");
    }
  }, [authChecked, user, router]);

  const onLoginPressed = async () => {
    setIsLoading(true);
    if (!email.trim() || !password) {
      setError("Both fields are required");
      AccessibilityInfo.announceForAccessibility("Both fields are required");
      console.log("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      await login(email.trim(), password);
      router.replace("/(tabs)/home-screen/home-screen");
    } catch (error) {
      setError("The details you have provided do not match a user");
      AccessibilityInfo.announceForAccessibility(
        "The details you have provided do not match a user",
      );
      console.log("The details you have provided do not match a user-", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpPressed = () => {
    router.push("/(auth)/sign-up-screen/sign-up-screen");
  };

  return (
    <>
      <LoadingSpinner isVisible={isLoading} />
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
              Sign in
            </ThemedText>
            <ThemedTextInput
              placeholder="Email"
              accessibilityLabel="Email"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <ThemedTextInput
              placeholder="Password"
              accessibilityLabel="Password"
              textContentType="password"
              autoComplete="password"
              returnKeyType="done"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
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
            <ThemedButton title="Sign in" onPress={onLoginPressed} />
          </ThemedCard>
          <ThemedText style={[styles.footerText, { color: theme.textPrimary }]}>
            No account?
          </ThemedText>
          <ThemedButton title="Sign up" onPress={onSignUpPressed} />
        </ThemedView>
      </TouchableWithoutFeedback>
    </>
  );
}
