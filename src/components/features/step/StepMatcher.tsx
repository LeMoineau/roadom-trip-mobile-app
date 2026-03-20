import { Step } from "../../../models/features/step.model";
import { HGBDHintDto } from "../../../shared/types/dto/hints/HGBDHint.dto";
import { ProximityNotificationDto } from "../../../shared/types/dto/notifications/ProximityNotification.dto";
import HGBDHint from "./hints/HGBDHint";
import ProximityNotification from "./notifications/ProximityNotification";

export default function StepMatcher({ step }: { step: Step }) {
  switch (step.type) {
    case "proximity-notification":
      return (
        <ProximityNotification
          step={step.toDto() as ProximityNotificationDto}
        ></ProximityNotification>
      );
    case "haut-gauche-bas-droite-hint":
      return <HGBDHint step={step.toDto() as HGBDHintDto}></HGBDHint>;
    default:
      return <></>;
  }
}
