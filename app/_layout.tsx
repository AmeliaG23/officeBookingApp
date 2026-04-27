import { BookingsProvider } from "@/context/bookings-context";
import { SeatsProvider } from "@/context/seats-context";
import { UserProvider } from "@/context/user-context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <UserProvider>
      <SeatsProvider>
        <BookingsProvider>
          <ThemeProvider
            value={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                background: "#edeff7",
              },
            }}
          >
            <StatusBar barStyle="default" />
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </BookingsProvider>
      </SeatsProvider>
    </UserProvider>
  );
}
