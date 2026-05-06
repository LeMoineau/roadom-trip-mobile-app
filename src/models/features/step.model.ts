import { stepsNames } from "../../constants/features/steps-name";
import { ProximityNotificationDto } from "../../shared/types/dto/notifications/ProximityNotification.dto";
import { StepDto } from "../../shared/types/dto/Step.dto";
import { DateUtils } from "../../shared/utils/date.utils";

export class Step {
  dto: StepDto;

  constructor(dto: StepDto) {
    this.dto = dto;
  }

  get id() {
    return this.dto.id;
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

  get available(): boolean {
    return this.availableIn <= 0;
  }

  get availableIn(): number {
    const now = new Date();
    const nextStepDate =
      typeof this.availableAt === "string"
        ? new Date(this.availableAt)
        : this.availableAt;
    return DateUtils.diffInMinute(nextStepDate, now);
  }

  get availableInHumanReadable(): string {
    return DateUtils.diffHumanlyReadable(this.availableIn);
  }

  toDto() {
    return this.dto;
  }
}
