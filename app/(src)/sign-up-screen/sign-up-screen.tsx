import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedTextInput } from "@/components/themed-text-input/themed-text-input";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onCreateAccount = () => {
    // add logic to check is fields match expected values and create account in database
    //  set dialog to display as error if passwords do not match
    if (password !== confirmPassword) {
      // Display error dialog
      return;
    }

    router.back();
  };

  const onSignIn = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign up</Text>
      <ThemedTextInput
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <ThemedTextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ThemedTextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <ThemedButton title="Create Account" onPress={onCreateAccount} />
      <ThemedButton
        title="Already have an account? Sign In"
        onPress={onSignIn}
      />
    </View>
  );
}
