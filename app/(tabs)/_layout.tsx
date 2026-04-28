import { Colors } from "@/constants/theme";
import SignedInOnly from "@/context/signed-in-only";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  return (
    <SignedInOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.surface,
            height: 70,
          },
          tabBarActiveTintColor: theme.textPrimary,
          tabBarInactiveTintColor: theme.textMuted,
        }}
      >
        <Tabs.Screen
          name="home-screen/home-screen"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="check-in-screen/check-in-screen"
          options={{
            title: "Check In",
            tabBarIcon: ({ color }) => (
              <Ionicons name="checkmark-done" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile-screen/profile-screen"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SignedInOnly>
  );
}
