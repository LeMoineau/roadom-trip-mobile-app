import {
  ColorValue,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon, { AllIconNames } from "../icons/ExpoIcon";

export default function IconButton({
  iconName,
  iconSize = 30,
  color = colors.primary,
  style,
  iconStyle,
  onPress,
}: {
  iconName: AllIconNames;
  iconSize?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={[
        {
          borderWidth: 1,
          borderColor: color,
          borderRadius: 50,
          padding: 10,
        },
        style,
      ]}
      onPress={onPress}
    >
      <ExpoIcon
        name={iconName}
        size={iconSize}
        style={[{ color }, iconStyle]}
      ></ExpoIcon>
    </Pressable>
  );
}
