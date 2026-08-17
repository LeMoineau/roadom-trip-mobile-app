import { StyleProp, Text, View, ViewStyle } from "react-native";
import { colors } from "../../../constants/style/colors";
import Divider from "./Divider";

export default function DividerTitle({
  title,
  style,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.gray[500] }}>{title}</Text>
      <Divider style={{ flex: 1 }}></Divider>
    </View>
  );
}
