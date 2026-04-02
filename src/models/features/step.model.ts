import { stepsNames } from "../../constants/features/steps-name";
import { ProximityNotificationDto } from "../../shared/types/dto/notifications/ProximityNotification.dto";
import { StepDto } from "../../shared/types/dto/Step.dto";

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
      const name = (stepsNames as any)[this.type];
      if (name.length > 0) return name;
    }
    return this.type;
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
