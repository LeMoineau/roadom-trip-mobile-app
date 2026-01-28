import { StyleProp, View, ViewStyle } from "react-native";
import { colors } from "../../../constants/style/colors";

export default function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View
      style={[{ borderTopWidth: 1, borderTopColor: colors.gray[200] }, style]}
    ></View>
  );
}
