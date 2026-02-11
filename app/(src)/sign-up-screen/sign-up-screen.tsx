import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onCreateAccount = () => {
    // add logic to check is fields match expected values and create account in database
    router.push("../index/Index");
  };

  const onSignIn = () => {
    router.push("../index/Index");
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign in</Text>
      <TextInput
        placeholder="username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 12,
          borderRadius: 8,
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 16,
          borderRadius: 8,
        }}
      />
      <Button title="Create Account" onPress={onCreateAccount} />
      <Button title="Already have an account? Sign In" onPress={onSignIn} />
    </View>
  );
}
