import { useEffect, useState } from "react";
import { colors } from "../../../constants/style/colors";
import { Trip } from "../../../models/features/trip.model";
import NoMoreStepItem from "../../common/items/NoMoreStepItem";
import TripStatusItem from "../../common/items/TripStatusItem";

export default function NextStepDelayItem({ trip }: { trip: Trip }) {
  const [nextStepDelay, setNextStepDelay] = useState<number | undefined>(30);

  useEffect(() => {
    setNextStepDelay(trip.getNextStepDelay());
    let intervalId = setInterval(() => {
      setNextStepDelay(trip.getNextStepDelay());
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [trip]);

  if (trip.status === "finish") {
    return;
  }

  if (nextStepDelay === undefined) {
    return <NoMoreStepItem></NoMoreStepItem>;
  }

  if (nextStepDelay <= 0) {
    return (
      <TripStatusItem
        bgColor={colors.green[50]}
        borderColor={colors.green[100]}
        textColor={colors.green[500]}
        title="Nouvel indice disponible !"
        icon="new-releases"
      ></TripStatusItem>
    );
  }

  return (
    <TripStatusItem
      bgColor={colors.yellow[50]}
      borderColor={colors.yellow[100]}
      textColor={colors.yellow[500]}
      title={`Prochain indice dans ${trip.getNextStep()?.availableInHumanReadable}`}
      icon="clock-o"
    ></TripStatusItem>
  );
}
