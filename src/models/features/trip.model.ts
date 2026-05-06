import { Route, RouteStep } from "osrm";
import { AllIconNames } from "../../components/common/icons/ExpoIcon";
import { ChallengeDto } from "../../shared/types/dto/challenges/Challenge.dto";
import { TripDto } from "../../shared/types/dto/trip/Trip.dto";
import { DateUtils } from "../../shared/utils/date.utils";
import { Challenge } from "./challenge.model";
import { Step } from "./step.model";

export class Trip {
  dto: TripDto;
  steps: Step[];

  constructor(dto: TripDto) {
    this.dto = dto;
    this.steps = dto.steps.map((s) =>
      s.type.includes("challenge")
        ? new Challenge(s as ChallengeDto, this)
        : new Step(s, this),
    );
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

  get endingAt() {
    return this.dto.endingAt;
  }

  get status() {
    return this.dto.status;
  }

  get personAskingAvailable(): number | undefined {
    return this.dto.personAskingAvailable;
  }

  set personAskingAvailable(nb: number) {
    this.dto.personAskingAvailable = nb;
  }

  get route() {
    return this.dto.route;
  }

  get duration() {
    if (!!!this.endingAt) return;
    return DateUtils.diffInMinute(
      new Date(this.endingAt),
      new Date(this.createdAt),
    );
  }

  set allow5sGps(val: boolean) {
    this.dto.allow5sGps = val;
  }

  get totalPersonAsked(): number | undefined {
    return this.dto.totalPersonAsked;
  }

  set totalPersonAsked(val: number) {
    this.totalPersonAsked = val;
  }

  getNextStep(): Step | undefined {
    for (let step of this.steps) {
      if (!!!step.reach) {
        return step;
      }
    }
    return;
  }

  getNextStepDelay(): number | undefined {
    const nextStep = this.getNextStep();
    if (!!!nextStep) return;
    const now = new Date();
    const nextStepDate =
      typeof nextStep.availableAt === "string"
        ? new Date(nextStep.availableAt)
        : nextStep.availableAt;
    return DateUtils.diffInMinute(nextStepDate, now);
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
        return { label: "Nouveau", icon: "new-releases", color: "blue" };
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

  getRoutePolyline() {
    if (!!this.route) {
      if (this.route.source === "osrm") {
        const osrmRes = this.route.route as Route;
        if (osrmRes.legs.length > 0) {
          return osrmRes.legs[0].steps
            .map((s: RouteStep) => {
              if (typeof s.geometry !== "string") {
                return [
                  ...s.geometry.coordinates.map((coords) => coords.reverse()),
                ];
              }
            })
            .filter((s) => !!s);
        }
      }
    }
  }

  finish() {
    this.dto.status = "finish";
    this.dto.endingAt = new Date().toString();
  }

  abandon() {
    this.dto.status = "abandoned";
    this.dto.endingAt = new Date().toString();
  }

  addPersonAvailable(nb: number) {
    if (this.personAskingAvailable === undefined) {
      this.personAskingAvailable = nb;
    } else {
      this.personAskingAvailable += nb;
    }
  }

  removePersonAvailable(nb: number) {
    if (this.personAskingAvailable !== undefined) {
      this.personAskingAvailable -= nb;
    }
  }

  addPersonAsked(nb: number) {
    if (this.totalPersonAsked === undefined) {
      this.totalPersonAsked = nb;
    } else {
      this.totalPersonAsked += nb;
    }
  }

  toDto() {
    return this.dto;
  }
}
