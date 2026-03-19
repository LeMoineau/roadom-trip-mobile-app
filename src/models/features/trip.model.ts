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

  getNextStep(options?: {}): Step | undefined {
    for (let step of this.steps) {
      if (!!!step.reach) {
        return step;
      }
    }
    return;
  }

  getActualProximityNotification(): Step | undefined {
    for (let step of this.steps) {
      if (step.type === "proximity-notification" && !!step.reach) {
        return step;
      }
    }
    return;
  }

  toDto() {
    return this.dto;
  }
}
