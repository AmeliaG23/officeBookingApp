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
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function Index() {
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
      console.log("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      await login(email.trim(), password);
      router.replace("/(tabs)/home-screen/home-screen");
    } catch (error) {
      setError("The details you have provided do not match a user");
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
              borderColor: Colors.blue.text,
              borderWidth: 1,
              borderRadius: 15,
              backgroundColor: Colors.blue.card,
            }}
          >
            <ThemedText
              style={{
                fontSize: 24,
                color: Colors.blue.text,
                alignSelf: "center",
              }}
            >
              Sign in
            </ThemedText>
            <ThemedTextInput
              placeholder="Email"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <ThemedTextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error && (
              <ThemedText
                style={{
                  marginTop: 16,
                  color: Colors.red.text,
                  textAlign: "center",
                }}
              >
                {error}
              </ThemedText>
            )}
            <ThemedButton title="Log in" onPress={onLoginPressed} />
          </ThemedCard>
          <ThemedText
            style={{
              marginBottom: 16,
              marginTop: 16,
              color: Colors.blue.text,
              alignSelf: "center",
            }}
          >
            No account?
          </ThemedText>
          <ThemedButton title="Sign Up" onPress={onSignUpPressed} />
        </ThemedView>
      </TouchableWithoutFeedback>
    </>
  );
}
