import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { Step } from "../../../models/features/step.model";
import ExpoIcon from "../../common/icons/ExpoIcon";

export function NextStepNotAvailableItem({
  step,
  availableIn,
  onOpenNextStep,
}: {
  step: Step;
  availableIn: number;
  onOpenNextStep?: (step: Step) => void;
}) {
  return (
    <TouchableOpacity
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: colors.yellow[50],
        borderWidth: 1,
        borderColor: colors.yellow[200],
        display: "flex",
        flexDirection: "row",
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
      <View>
        <ExpoIcon
          name="clock-o"
          size={20}
          style={{ color: colors.yellow[500], marginTop: 5 }}
        ></ExpoIcon>
      </View>
      <View
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}
      >
        <Text style={{ fontWeight: 600, color: colors.yellow[500] }}>
          Le prochain {`${step.stepType === "Indice" ? "indice" : "challenge"}`}{" "}
          sera bientôt disponible
        </Text>
        {availableIn > 0 && (
          <Text
            style={{ fontSize: 12, color: colors.yellow[500], fontWeight: 500 }}
          >
            dans {step.availableInHumanReadable}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
