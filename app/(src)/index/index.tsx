import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onLogin = () => {
    router.push("../home-screen/HomeScreen");
  };

  const onSignUp = () => {
    router.push("../sign-up/SignUp");
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
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 16,
          borderRadius: 8,
        }}
      />
      <Button title="Log in" onPress={onLogin} />
      <Button
        title="Don't already have an account? Sign Up"
        onPress={onSignUp}
      />
    </View>
  );
}
