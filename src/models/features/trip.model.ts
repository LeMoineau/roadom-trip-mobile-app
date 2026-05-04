import { AllIconNames } from "../../components/common/icons/ExpoIcon";
import { TripDto } from "../../shared/types/dto/trip/Trip.dto";
import { Step } from "./step.model";

export class Trip {
  dto: TripDto;
  steps: Step[];

  constructor(dto: TripDto) {
    this.dto = dto;
    this.steps = dto.steps.map((s) => new Step(s));
  }

  get id() {
    return this.dto.id;
  }

  get startingPos() {
    return this.dto.startingPos;
  }

  get endingPos() {
    return this.dto.endingPos;
  }

  get createdAt() {
    return this.dto.createdAt;
  }

  get status() {
    return this.dto.status;
  }

  get personAskingAvailable() {
    return this.dto.personAskingAvailable;
  }

  getNextStep(options?: {}): Step | undefined {
    for (let step of this.steps) {
      if (!!!step.reach) {
        return step;
      }
    }
    return;
  }

  getActualProximityNotification(): Step | undefined {
    for (let i = this.steps.length - 1; i >= 0; i--) {
      const step = this.steps[i];
      if (step.type === "proximity-notification" && !!step.reach) {
        return step;
      }
    }
    return;
  }

  getStatusStyle(): { label: string; icon: AllIconNames; color: string } {
    switch (this.status) {
      case "new":
        return { label: "Nouveau", icon: "new-releases", color: "gray" };
      case "ongoing":
        return { label: "En cours", icon: "clock-o", color: "green" };
      case "finish":
        return { label: "Terminé", icon: "done", color: "green" };
      case "abandoned":
        return { label: "Abandonné", icon: "close", color: "red" };
      default:
        return { label: "En cours", icon: "clock-o", color: "green" };
    }
  }

  archive() {
    this.dto.status = "finish";
  }

  toDto() {
    return this.dto;
  }
}
