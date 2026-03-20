import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./(src)/home-screen/home-screen";
import ProfileScreen from "./(src)/profile-screen/profile-screen";

const SignedInTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});
