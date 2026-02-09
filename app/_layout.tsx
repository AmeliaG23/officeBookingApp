import { useColorScheme } from "@/hooks/use-color-scheme";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
      <Stack />
    </ThemeProvider>
  );
}
