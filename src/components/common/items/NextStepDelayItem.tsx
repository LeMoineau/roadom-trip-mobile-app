import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { TripDto } from "../../../shared/types/dto/trip/Trip.dto";
import ExpoIcon from "../icons/ExpoIcon";

export default function NextStepDelayItem({ trip }: { trip: TripDto }) {
  const [nextStepDelay, setNextStepDelay] = useState<number | undefined>(30);
  const nextStepStatus = !!!nextStepDelay
    ? "finish"
    : nextStepDelay < 0
      ? "available"
      : "waiting";

  useEffect(() => {
    const nextStep = trip.steps.find((s) => !!!s.reach);
    if (!!!nextStep) {
      setNextStepDelay(undefined);
    } else {
      const now = new Date();
      const nextStepDate =
        typeof nextStep.availableAt === "string"
          ? new Date(nextStep.availableAt)
          : nextStep.availableAt;
      setNextStepDelay(
        Math.round(
          (((nextStepDate.getTime() - now.getTime()) % 86400000) % 3600000) /
            60000,
        ),
      );
    }
  });

  return (
    <View
      style={{
        padding: 15,
        borderRadius: 10,
        backgroundColor:
          nextStepStatus === "available" ? colors.green[50] : colors.blue[50],
        borderWidth: 1,
        borderColor:
          nextStepStatus === "available" ? colors.green[200] : colors.blue[200],
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <ExpoIcon
        name={nextStepStatus === "available" ? "road" : "timelapse"}
        size={20}
        style={{
          color:
            nextStepStatus === "available"
              ? colors.green[500]
              : colors.blue[800],
        }}
      ></ExpoIcon>
      {nextStepStatus === "available" ? (
        <Text style={{ color: colors.green[500], fontWeight: 600 }}>
          Prochaine étape disponible !
        </Text>
      ) : (
        <Text style={{ color: colors.blue[800] }}>
          Prochain indice dans {nextStepDelay}min
        </Text>
      )}
    </View>
  );
}
