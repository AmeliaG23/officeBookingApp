import { Colors } from "@/constants/theme";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type ThemedDropdownProps = {
  placeholder: string;
  data: { label: string; value: string }[];
  icon: "team" | "building";
  value?: string;
  onChange?: (value: string) => void;
};

const ThemedDropdown = ({
  placeholder = "Select item",
  data,
  icon = "team",
  value,
  onChange,
}: ThemedDropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const colorScheme = useColorScheme();
  const theme = Colors.semantic[colorScheme ?? "light"];

  //   const value = externalValue !== undefined ? externalValue : localValue;

  return (
    <View
      accessible
      accessibilityRole="button"
      accessibilityHint={`Opens ${placeholder.toLowerCase()} options`}
      style={{ paddingTop: 16, marginTop: 20, width: "45%" }}
    >
      <Dropdown
        style={[
          {
            height: 50,
            borderColor: theme.border,
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            backgroundColor: theme.surface,
          },
          isFocus && { borderColor: theme.textPrimary },
        ]}
        placeholderStyle={{ color: theme.textMuted }}
        selectedTextStyle={{ color: theme.textPrimary }}
        search={false}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        itemTextStyle={{ color: theme.textPrimary }}
        itemContainerStyle={{ backgroundColor: theme.surface }}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange?.(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() =>
          // https://icons.expo.fyi/Index
          icon === "team" ? (
            <AntDesign
              style={{ marginRight: 5 }}
              color={isFocus ? theme.textPrimary : theme.textMuted}
              name="team"
              size={20}
            />
          ) : (
            <FontAwesome5
              style={{ marginRight: 5 }}
              color={isFocus ? theme.textPrimary : theme.textMuted}
              name={"building"}
              size={20}
            />
          )
        }
      />
    </View>
  );
};

export default ThemedDropdown;
