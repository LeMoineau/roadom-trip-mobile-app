import { ColorValue, Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon, { AllIconNames } from "../icons/ExpoIcon";

export default function TripStatusItem({
  bgColor = colors.gray[50],
  borderColor = colors.gray[100],
  textColor,
  title,
  desc,
  icon,
}: {
  bgColor: ColorValue;
  borderColor: ColorValue;
  textColor?: ColorValue;
  title: string;
  desc?: string;
  icon?: AllIconNames;
}) {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: bgColor,
        borderWidth: 1,
        borderColor: borderColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingRight: 15,
        flex: 1,
        gap: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        {icon && (
          <View>
            <ExpoIcon
              name={icon}
              size={17}
              style={{ color: textColor }}
            ></ExpoIcon>
          </View>
        )}
        <View
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Text style={{ fontWeight: 600, color: textColor }}>{title}</Text>
          {desc && (
            <Text style={{ fontSize: 12, color: textColor }}>{desc}</Text>
          )}
        </View>
      </View>
    </View>
  );
}
