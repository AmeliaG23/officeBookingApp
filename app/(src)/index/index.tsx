import { ThemedButton } from "@/components/themed-button/themed-button";
import { ThemedTextInput } from "@/components/themed-text-input/themed-text-input";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    // add logic to check username against username and password
    // set dialog to display as error if username and password do not match
    router.push("/(src)/home-screen/home-screen");
  };

  const onSignUp = () => {
    router.push("/(src)/sign-up-screen/sign-up-screen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/aviva.webp")}
        style={styles.image}
      />
      <Text style={{ fontSize: 24, marginBottom: 10, color: Colors.blue.text }}>
        Sign in
      </Text>
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
      <View style={{ alignContent: "center" }}>
        <ThemedButton title="Log in" onPress={onLogin} />
        <Text style={{ marginBottom: 16, color: Colors.blue.text }}>
          Do not have an account?
        </Text>
        <ThemedButton title="Sign Up" onPress={onSignUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
});
