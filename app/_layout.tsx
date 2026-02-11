import { useColorScheme } from "@/hooks/use-color-scheme";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // TODO: add logic to check useAuth if user signed in
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}></ThemeProvider>
    <ThemeProvider
      value={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#edeff7",
        },
      }}
    >
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="homeScreen" options={{ title: "Home" }} />
        <Stack.Screen name="homeScreen" options={{ title: "Home" }} />
      </Stack>
    </ThemeProvider>
  );
}
