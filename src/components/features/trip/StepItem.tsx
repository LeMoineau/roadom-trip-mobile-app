import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { Step } from "../../../models/features/step.model";
import ExpoIcon from "../../common/icons/ExpoIcon";
import Divider from "../../common/misc/Divider";

export default function StepItem({ step }: { step: Step }) {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.gray[50],
        borderWidth: 1,
        borderColor: colors.gray[200],
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingRight: 15,
        flex: 1,
        gap: 20,
      }}
    >
      <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Text style={{ fontWeight: 600 }}>{step.name}</Text>
        <Text style={{ fontSize: 12 }}>{step.stepType}</Text>
      </View>
      <Divider style={{ width: "100%" }}></Divider>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: 10,
          width: "100%",
        }}
      >
        <Text style={{ color: colors.gray[800], fontWeight: "600" }}>
          Voir plus
        </Text>
        <ExpoIcon name="chevron-forward" size={20}></ExpoIcon>
      </View>
    </View>
  );
}
