import { Route, RouteStep } from "osrm";
import { AllIconNames } from "../../components/common/icons/ExpoIcon";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { ChallengeDto } from "../../shared/types/dto/challenges/Challenge.dto";
import { TripDto } from "../../shared/types/dto/trip/Trip.dto";
import { DateUtils } from "../../shared/utils/date.utils";
import { GeoUtils } from "../../shared/utils/geo.utils";
import { Challenge } from "./challenge.model";
import { Step } from "./step.model";

export class Trip {
  dto: TripDto;
  _steps: Step[];

  constructor(dto: TripDto) {
    this.dto = dto;
    this._steps = dto.steps.map((s) =>
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

  get startingAt() {
    return this.dto.startingAt;
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

  get preferredRoutePoints(): GeoPoint[] | undefined {
    if (!!!this.route) return;
    if (this.route.source === "osrm") {
      const osrmRes = this.route.route as Route;
      if (osrmRes.legs.length > 0) {
        return osrmRes.legs[0].steps
          .flatMap((s: RouteStep) => {
            if (typeof s.geometry !== "string") {
              return [
                ...s.geometry.coordinates.map(
                  (coords) => new GeoPoint({ lat: coords[1], lon: coords[0] }),
                ),
              ];
            }
            return;
          })
          .filter((s) => !!s);
      }
    }
  }

  get duration() {
    if (!!!this.endingAt) return;
    return DateUtils.diffInMinute(
      new Date(this.endingAt),
      new Date(this.startingAt ?? this.createdAt),
    );
  }

  set allow5sGps(val: boolean) {
    this.dto.allow5sGps = val;
  }

  get totalPersonAsked(): number {
    return this.dto.totalPersonAsked ?? 0;
  }

  set totalPersonAsked(val: number) {
    this.dto.totalPersonAsked = val;
  }

  get steps() {
    return this._steps;
  }

  set steps(ss: Step[]) {
    this._steps = ss;
    this.dto.steps = ss.map((s) => s.toDto());
  }

  get traveledRoute(): GeoPoint[] {
    return this.dto.traveledRoute
      ? this.dto.traveledRoute.map((p) => new GeoPoint(p))
      : [];
  }

  set traveledRoute(val: GeoPoint[]) {
    this.dto.traveledRoute = val.map((p) => p.toDto());
  }

  get nbStepsReached() {
    return this.steps.filter((s) => !!s.reach).length;
  }

  get distanceTraveled() {
    let previousPt;
    let distance = 0;
    for (let pt of this.traveledRoute) {
      if (!!previousPt) {
        distance += GeoUtils.getDistanceBetween(previousPt, pt);
      }
      previousPt = pt;
    }
    return distance;
  }

  get distancePreferredRoute(): number | undefined {
    if (!!!this.route || !!!this.preferredRoutePoints) return;
    let previousPt;
    let distance = 0;
    for (let pt of this.preferredRoutePoints) {
      if (!!previousPt) {
        distance += GeoUtils.getDistanceBetween(previousPt, pt);
      }
      previousPt = pt;
    }

    return distance;
  }

  get started() {
    return this.status !== "new";
  }

  get ended() {
    return ["finish", "abandoned"].includes(this.status);
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
        return { label: "En cours", icon: "clock-o", color: "yellow" };
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

  start() {
    this.dto.status = "ongoing";
    this.dto.startingAt = new Date().toString();
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

  addPointInTraveledRoute(pt: GeoPoint) {
    this.traveledRoute = [...this.traveledRoute, pt];
  }

  toDto() {
    return this.dto;
  }
}
