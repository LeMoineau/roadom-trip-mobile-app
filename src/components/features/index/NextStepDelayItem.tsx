import { useEffect, useState } from "react";
import { colors } from "../../../constants/style/colors";
import { Trip } from "../../../models/features/trip.model";
import TripStatusItem from "../../common/items/TripStatusItem";

export default function NextStepDelayItem({ trip }: { trip: Trip }) {
  const [nextStepDelay, setNextStepDelay] = useState<number | undefined>(30);
  const nextStepStatus = !!!nextStepDelay
    ? "finish"
    : nextStepDelay < 0
      ? "available"
      : "waiting";

  useEffect(() => {
    const nextStep = trip.getNextStep();
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

  if (trip.status === "finish") {
    return;
  }

  if (nextStepStatus === "finish") {
    return (
      <TripStatusItem
        bgColor={colors.gray[50]}
        borderColor={colors.gray[100]}
        textColor={colors.gray[500]}
        title="Plus de prochaine étape !"
        desc="Vous avez épuisé tous les indices et challenges disponibles ! Bon courage pour trouver votre destination !"
      ></TripStatusItem>
    );
  }
}
