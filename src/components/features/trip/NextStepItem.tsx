import { useEffect, useState } from "react";
import { Step } from "../../../models/features/step.model";
import NoMoreStepItem from "../../common/items/NoMoreStepItem";
import { NextStepAvailableItem } from "./NextStepAvailableItem";
import { NextStepNotAvailableItem } from "./NextStepNotAvailableItem";

export default function NextStepItem({
  step,
  onOpenNextStep,
}: {
  step: Step;
  onOpenNextStep?: (step: Step) => void;
}) {
  const [availableIn, setAvailableIn] = useState<number>(30);

  useEffect(() => {
    setAvailableIn(step.availableIn);
    let intervalId = setInterval(() => {
      setAvailableIn(step.availableIn);
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [step]);

  if (!!!step) {
    return <NoMoreStepItem></NoMoreStepItem>;
  }

  if (availableIn <= 0) {
    return (
      <NextStepAvailableItem
        step={step}
        availableIn={availableIn}
        onOpenNextStep={onOpenNextStep}
      ></NextStepAvailableItem>
    );
  }

  return (
    <NextStepNotAvailableItem
      step={step}
      availableIn={availableIn}
    ></NextStepNotAvailableItem>
  );
}
