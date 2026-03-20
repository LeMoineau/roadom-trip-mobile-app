import { stepsNames } from "../../constants/features/steps-name";
import { ProximityNotificationDto } from "../../shared/types/dto/notifications/ProximityNotification.dto";
import { StepDto } from "../../shared/types/dto/Step.dto";

const DEFAULT_NAME = "Inconnu au bataillon";

export class Step {
  dto: StepDto;

  constructor(dto: StepDto) {
    this.dto = dto;
  }

  get reach() {
    return this.dto.reach;
  }

  get type() {
    return this.dto.type;
  }

  get availableAt() {
    return this.dto.availableAt;
  }

  get name() {
    if (this.type === "proximity-notification") {
      return `Notification de Proximité à ${(this.dto as ProximityNotificationDto).range}km`;
    }
    if (this.type in stepsNames) {
      return (stepsNames as any)[this.type];
    }
    return DEFAULT_NAME;
  }

  get stepType() {
    if (this.type.includes("notification")) {
      return "Notification";
    } else if (this.type.includes("challenge")) {
      return "Challenge";
    }
    return "Indice";
  }

  toDto() {
    return this.dto;
  }
}
