import { Colors } from "@/constants/theme";
import SignedInOnly from "@/context/signed-in-only";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <SignedInOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.light.background,
            height: 70,
            paddingVertical: 10,
          },
          tabBarActiveTintColor: Colors.blue.icon,
          tabBarInactiveTintColor: Colors.light.icon,
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
