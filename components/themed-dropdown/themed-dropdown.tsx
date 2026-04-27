import { Colors } from "@/constants/theme";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
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

  //   const value = externalValue !== undefined ? externalValue : localValue;

  return (
    <View style={{ paddingTop: 16, marginTop: 20, width: "45%" }}>
      <Dropdown
        style={[
          {
            height: 50,
            borderColor: Colors.blue.tabIconDefault,
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            backgroundColor: Colors.light.background,
          },
          isFocus && { borderColor: Colors.blue.tabIconSelected },
        ]}
        placeholderStyle={{ color: Colors.blue.text }}
        selectedTextStyle={{ color: Colors.blue.text }}
        search={false}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
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
              color={isFocus ? Colors.blue.tabIconSelected : Colors.blue.text}
              name="team"
              size={20}
            />
          ) : (
            <FontAwesome5
              style={{ marginRight: 5 }}
              color={isFocus ? Colors.blue.tabIconSelected : Colors.blue.text}
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
