/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const tintBlue = "rgb(7, 68, 89)";
const tintYellow = "rgb(239, 206, 84)";
const tintGreen = "rgb(89, 194, 71)";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#8e9397",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  blue: {
    text: "#092c4b",
    background: "#E6F0FA",
    tint: tintBlue,
    icon: "#092c4b",
    tabIconDefault: "#092c4b",
    tabIconSelected: tintBlue,
    card: "#c3d6e7",
  },
  yellow: {
    text: "#FCCA12",
    background: "#E6F0FA",
    tint: tintYellow,
    icon: "#FCCA12",
    tabIconDefault: "#f3e3a7",
    tabIconSelected: tintYellow,
  },
  green: {
    text: "#59C247",
    background: "#E6F0FA",
    tint: tintGreen,
    icon: "#59C247",
    tabIconDefault: "#59C247",
    tabIconSelected: tintGreen,
  },
  red: {
    text: "#FF0000",
    background: "#FFE6E6",
    tint: "#FF0000",
    icon: "#FF0000",
    tabIconDefault: "#FF0000",
    tabIconSelected: "#FF0000",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});
