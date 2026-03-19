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
