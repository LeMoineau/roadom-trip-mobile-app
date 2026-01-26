import React from "react";
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../../../constants/style/colors";

export default function FloatingButton({
  content,
  bgColor,
  textColor,
  prependIcon,
  appendIcon,
  onPress,
  style,
  textStyle,
}: {
  content?: string;
  bgColor?: ColorValue;
  textColor?: ColorValue;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <TouchableOpacity
      style={[
        {
          position: "absolute",
          bottom: 10,
          right: 20,
          gap: 10,
          backgroundColor: bgColor ?? colors.primary,
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 25,
          paddingVertical: 15,
          borderRadius: 20,
          alignItems: "center",
        },
        style,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {prependIcon}
      {content && content.length > 0 && (
        <Text
          style={[
            { color: textColor ?? colors.white, fontSize: 17 },
            textStyle,
          ]}
        >
          {content}
        </Text>
      )}
      {appendIcon}
    </TouchableOpacity>
  );
}
