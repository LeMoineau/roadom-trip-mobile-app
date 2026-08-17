import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon from "../icons/ExpoIcon";

export default function RadioButton({
  checked,
  content,
  onPress,
  style,
  textContainerStyle,
  textStyle,
  activeOpacity,
}: {
  checked?: boolean;
  content?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}) {
  return (
    <TouchableOpacity
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderWidth: 1,
          borderColor: colors.gray[200],
          borderRadius: 20,
          padding: 20,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <View
        style={[
          {
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          },
          textContainerStyle,
        ]}
      >
        <ExpoIcon
          name={checked ? "check-circle-o" : "circle-o"}
          size={20}
        ></ExpoIcon>
        {content && (
          <Text
            style={[
              {
                fontSize: 15,
                fontWeight: 500,
                color: colors.black,
                flex: 1,
              },
              textStyle,
            ]}
          >
            {content}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
