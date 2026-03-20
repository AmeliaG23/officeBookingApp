import { UserProvider } from "@/context/user-context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { createTables } from "./(src)/db/create-tables";

export default function RootLayout() {
  useEffect(() => {
    async function setupDatabase() {
      try {
        await createTables();
      } catch (error) {
        console.error("Error setting up database tables-", error);
      }
    }
    setupDatabase();
  }, []);

  // TODO: add logic to check useAuth if user signed in
  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}></ThemeProvider>
    <UserProvider>
      <ThemeProvider
        value={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "#edeff7",
          },
        }}
      >
        <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
          <Stack.Screen
            name="(src)/index/index"
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="(src)/sign-up-screen/sign-up-screen"
            options={{ title: "Sign Up" }}
          />
          <Stack.Screen
            name="(src)/home-screen/home-screen"
            options={{ title: "Home" }}
          />
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
