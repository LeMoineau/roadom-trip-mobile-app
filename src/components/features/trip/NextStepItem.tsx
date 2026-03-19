import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { Step } from "../../../models/features/step.model";
import ExpoIcon from "../../common/icons/ExpoIcon";
import NoMoreStepItem from "../../common/items/NoMoreStepItem";
import Divider from "../../common/misc/Divider";

/**
 *
 */
export default function NextStepItem({
  step,
  onOpenNextStep,
}: {
  step: Step;
  onOpenNextStep?: (step: Step) => void;
}) {
  if (!!!step) {
    return <NoMoreStepItem></NoMoreStepItem>;
  }

  return (
    <TouchableOpacity
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.gray[200],
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingRight: 15,
        flex: 1,
        gap: 20,
      }}
      onPress={() => {
        onOpenNextStep && onOpenNextStep(step);
      }}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Text style={{ fontWeight: 600, color: colors.white }}>
          Un nouvel indice est disponible !
        </Text>
        <Text style={{ fontSize: 12, color: colors.white }}>depuis 12min</Text>
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
        <Text style={{ color: colors.white, fontWeight: "600" }}>
          Ouvrir {`${step.stepType === "Indice" ? "l'indice" : "le challenge"}`}
        </Text>
        <ExpoIcon
          name="chevron-forward"
          size={20}
          style={{ color: colors.white }}
        ></ExpoIcon>
      </View>
    </TouchableOpacity>
  );
}
