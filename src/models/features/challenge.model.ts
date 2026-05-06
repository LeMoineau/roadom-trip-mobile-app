import { AllIconNames } from "../../components/common/icons/ExpoIcon";
import { ChallengeDto } from "../../shared/types/dto/challenges/Challenge.dto";
import { Reward } from "../../shared/types/dto/rewards/Reward";
import { Step } from "./step.model";
import { Trip } from "./trip.model";

export class Challenge extends Step {
  dto: ChallengeDto;
  rewardedStep?: Step;

  constructor(dto: ChallengeDto, trip: Trip) {
    super(dto, trip);
    this.dto = dto;
    if (this.reward && typeof this.reward !== "string" && !!this.reward.type) {
      this.rewardedStep = new Step(this.reward, trip);
    }
  }

  get id() {
    return this.dto.id;
  }

  get nbOfUses() {
    return this.dto.nbOfUses;
  }

  get minPhotos() {
    return this.dto.minPhotos;
  }

  get message() {
    return this.dto.message;
  }

  get reward(): Reward | undefined {
    return this.dto.reward;
  }

  get used(): boolean | undefined {
    return this.dto.used;
  }

  set used(val: boolean) {
    this.dto.used = val;
  }

  get nbOfUsesLabel() {
    return `${this.nbOfUses === "infinite" ? "" : this.nbOfUses + " "}Utilisation${this.nbOfUses === "infinite" ? " Infini" : ""}`;
  }

  get rewardLabel(): string {
    if (this.reward === "ask-1-person") {
      return "1 Aide";
    }
    if (this.reward === "ask-3-person") {
      return "3 Aides";
    }
    if (this.reward === "allow-gps-5s") {
      return "5s de GPS";
    }
    if (this.reward === "ask-infinite-person") {
      return "Aides Infini";
    }
    if (!!this.reward?.type && !!this.rewardedStep) {
      return this.rewardedStep.stepType + " - " + this.rewardedStep.name;
    }
    return "Inconnu";
  }

  get rewardIcon(): AllIconNames | undefined {
    if (this.reward === "ask-1-person") {
      return "person";
    }
    if (this.reward === "ask-3-person") {
      return "person-3";
    }
    if (this.reward === "allow-gps-5s") {
      return "location-on";
    }
    if (this.reward === "ask-infinite-person") {
      return "infinite";
    }
    if (!!this.reward?.type) {
      return;
    }
  }

  get earningRewardMessage(): string {
    if (this.reward === "ask-1-person") {
      return "Vous pouvez demander de l'aide à 1 personne en plus !";
    }
    if (this.reward === "ask-3-person") {
      return "Vous pouvez demander de l'aide à 3 personnes en plus !";
    }
    if (this.reward === "allow-gps-5s") {
      return "Vous avez le droit à 5s de GPS ! ";
    }
    if (this.reward === "ask-infinite-person") {
      return "Vous pouvez demander de l'aide à n'importe qui !";
    }
    if (!!this.reward?.type && !!this.rewardedStep) {
      return `${this.rewardedStep.newStepTypeLabel} "${this.rewardedStep.name}" a été ajouté à vos indices !`;
    }
    return "Vous avez remporté une récompense inconnu !";
  }

  get timeUsed() {
    return this.dto.timeUsed;
  }

  get finishDate(): Date | undefined {
    return this.dto.finishDate ? new Date(this.dto.finishDate) : undefined;
  }

  set finishDate(val: Date) {
    this.dto.finishDate = val.toString();
  }

  addTimeUsed(val: number) {
    if (!!!this.dto.timeUsed) {
      this.dto.timeUsed = val;
    } else {
      this.dto.timeUsed += val;
    }
  }

  earnReward() {
    if (this.reward === "ask-1-person") {
      this.trip.addPersonAvailable(1);
    } else if (this.reward === "ask-3-person") {
      this.trip.addPersonAvailable(3);
    } else if (this.reward === "ask-infinite-person") {
      this.trip.addPersonAvailable(99999);
    } else if (this.reward === "allow-gps-5s") {
      this.trip.allow5sGps = true;
    } else if (!!this.reward?.type && !!this.rewardedStep) {
      this.rewardedStep.reach = true;
      this.rewardedStep.availableAt = new Date();
      const tmp = [...this.trip.steps];
      const index = tmp.findIndex((s) => !!!s.reach);
      tmp.splice(index, 0, this.rewardedStep);
      this.trip.steps = tmp;
    }
    this.addTimeUsed(1);
    if (
      !!this.timeUsed &&
      this.nbOfUses !== "infinite" &&
      this.timeUsed >= this.nbOfUses
    ) {
      this.used = true;
      this.finishDate = new Date();
    }
  }
}
