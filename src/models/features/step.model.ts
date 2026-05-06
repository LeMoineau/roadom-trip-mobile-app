import { stepsNames } from "../../constants/features/steps-name";
import { ProximityNotificationDto } from "../../shared/types/dto/notifications/ProximityNotification.dto";
import { StepDto } from "../../shared/types/dto/Step.dto";
import { DateUtils } from "../../shared/utils/date.utils";
import { Trip } from "./trip.model";

export class Step {
  dto: StepDto;
  trip: Trip;

  constructor(dto: StepDto, trip: Trip) {
    this.dto = dto;
    this.trip = trip;
  }

  get id() {
    return this.dto.id;
  }

  get reach() {
    return this.dto.reach;
  }

  set reach(val: boolean) {
    this.dto.reach = val;
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

  get nextStepTypeLabel() {
    if (this.stepType === "Challenge") {
      return "Le prochain challenge";
    }
    if (this.stepType === "Notification") {
      return "La prochaine notification";
    }
    return "Le prochain indice";
  }

  get newStepTypeLabel() {
    if (this.stepType === "Challenge") {
      return "Un nouveau challenge";
    }
    if (this.stepType === "Notification") {
      return "Une nouvelle notification";
    }
    return "Un nouvel indice";
  }

  set availableAt(val: Date) {
    this.dto.availableAt = val;
  }

  reached() {
    this.reach = true;
  }

  toDto() {
    return this.dto;
  }
}
