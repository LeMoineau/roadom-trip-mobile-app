import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import ExpoIcon, { AllIconNames } from "../../common/icons/ExpoIcon";

export default function StatItem({
  label,
  value,
  valueIcon,
  color,
}: {
  label: string;
  value: string;
  valueIcon?: AllIconNames;
  color?: any;
}) {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color?.[50],
        padding: 20,
        borderRadius: 20,
        borderColor: color ? color[200] : colors.gray[200],
        borderWidth: 1,
      }}
    >
      <Text
        style={{ color: color?.[400], marginBottom: 0, textAlign: "center" }}
      >
        {label}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text
          style={{
            fontSize: 45,
            fontWeight: 700,
            color: color?.[700],
            marginTop: 0,
          }}
        >
          {value}
        </Text>
        {valueIcon && (
          <ExpoIcon
            name={valueIcon}
            size={30}
            style={{ color: color?.[700], marginBottom: -5 }}
          ></ExpoIcon>
        )}
      </View>
    </View>
  );
}
