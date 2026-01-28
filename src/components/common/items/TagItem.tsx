import { ColorValue, StyleProp, Text, View, ViewStyle } from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon, { AllIconNames } from "../icons/ExpoIcon";

export default function TagItem({
  text,
  bgColor = colors.primary,
  textColor = colors.white,
  iconName,
  style,
}: {
  text: string;
  bgColor?: ColorValue;
  textColor?: ColorValue;
  iconName?: AllIconNames;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: bgColor,
          borderRadius: 20,
          paddingHorizontal: 15,
          paddingVertical: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        },
        style,
      ]}
    >
      <Text style={{ color: textColor, fontSize: 10, fontWeight: 600 }}>
        {text}
      </Text>
      {iconName && (
        <ExpoIcon name={iconName} style={{ color: textColor }}></ExpoIcon>
      )}
    </View>
  );
}
