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

export default function OutlineButton({
  content,
  prependIcon,
  appendIcon,
  onPress,
  style,
  textContainerStyle,
  textStyle,
}: {
  content?: string;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
        {prependIcon}
        {content && (
          <Text
            style={[
              { fontSize: 15, fontWeight: 500, color: colors.black },
              textStyle,
            ]}
          >
            {content}
          </Text>
        )}
      </View>
      {appendIcon}
    </TouchableOpacity>
  );
}
