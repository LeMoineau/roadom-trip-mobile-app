import { Challenge } from "../../../models/features/challenge.model";
import { Step } from "../../../models/features/step.model";
import { CelebrityHintDto } from "../../../shared/types/dto/hints/CelebrityHint.dto";
import { CityPopulationHintDto } from "../../../shared/types/dto/hints/CityPopulationHint.dto";
import { CompassDirectionHintDto } from "../../../shared/types/dto/hints/CompassDirectionHint.dto";
import { DepartementHintDto } from "../../../shared/types/dto/hints/DepartementHint.dto";
import { DishHintDto } from "../../../shared/types/dto/hints/DishHint.dto";
import { FlagHintDto } from "../../../shared/types/dto/hints/FlagHint.dto";
import { HGBDHintDto } from "../../../shared/types/dto/hints/HGBDHint.dto";
import { NearCityHintDto } from "../../../shared/types/dto/hints/NearCityHint.dto";
import { PreciseDescriptionHintDto } from "../../../shared/types/dto/hints/PreciseDescriptionHint.dto";
import { RebusHintDto } from "../../../shared/types/dto/hints/RebusHint.dto";
import { ShoesHintDto } from "../../../shared/types/dto/hints/ShoesHint.dto";
import { StateHintDto } from "../../../shared/types/dto/hints/StateHint.dto";
import { TourismHintDto } from "../../../shared/types/dto/hints/TourismHint.dto";
import { WeatherHintDto } from "../../../shared/types/dto/hints/WeatherHint.dto";
import { ProximityNotificationDto } from "../../../shared/types/dto/notifications/ProximityNotification.dto";
import AttractionChallenge from "./challenges/AttractionChallenge";
import BlueCar5Challenge from "./challenges/BlueCar5Challenge";
import ChangeWheelChallenge from "./challenges/ChangeWheelChallenge";
import ComplimentChallenge from "./challenges/ComplimentChallenge";
import FuelStopChallenge from "./challenges/FuelStopChallenge";
import NoseChallenge from "./challenges/NoseChallenge";
import PotatoeChallenge from "./challenges/PotatoeChallenge";
import PushCarChallenge from "./challenges/PushCarChallenge";
import StateProductChallenge from "./challenges/StateProductChallenge";
import Toyota5Challenge from "./challenges/Toyota5Challenge";
import CelebrityHint from "./hints/CelebrityHint";
import CityPopulationHint from "./hints/CityPopulationHint";
import CompassDirectionHint from "./hints/CompassDirectionHint";
import DepartementHint from "./hints/DepartementHint";
import DishHint from "./hints/DishHint";
import FlagHint from "./hints/FlagHint";
import HGBDHint from "./hints/HGBDHint";
import NearCityHint from "./hints/NearCityHint";
import PreciseDescriptionHint from "./hints/PreciseDescriptionHint";
import RebusHint from "./hints/RebusHint";
import ShoesHint from "./hints/ShoesHint";
import StateHint from "./hints/StateHint";
import TourismHint from "./hints/TourismHint";
import WeatherHint from "./hints/WeatherHint";
import ProximityNotification from "./notifications/ProximityNotification";

export default function StepMatcher({ step }: { step: Step }) {
  switch (step.type) {
    case "proximity-notification":
      return (
        <ProximityNotification
          step={step.toDto() as ProximityNotificationDto}
        ></ProximityNotification>
      );
    case "haut-gauche-bas-droite-hint":
      return <HGBDHint step={step.toDto() as HGBDHintDto}></HGBDHint>;
    case "departement-flag-hint":
      return <FlagHint step={step.toDto() as FlagHintDto}></FlagHint>;
    case "departement-blason-hint":
      return (
        <DepartementHint
          step={step.toDto() as DepartementHintDto}
        ></DepartementHint>
      );
    case "celebrity-hint":
      return (
        <CelebrityHint step={step.toDto() as CelebrityHintDto}></CelebrityHint>
      );
    case "city-population-hint":
      return (
        <CityPopulationHint
          step={step.toDto() as CityPopulationHintDto}
        ></CityPopulationHint>
      );
    case "compass-direction-hint":
      return (
        <CompassDirectionHint
          step={step.toDto() as CompassDirectionHintDto}
        ></CompassDirectionHint>
      );
    case "departement-hint":
      return (
        <DepartementHint
          step={step.toDto() as DepartementHintDto}
        ></DepartementHint>
      );
    case "dish-hint":
      return <DishHint step={step.toDto() as DishHintDto}></DishHint>;
    case "near-city-hint":
      return (
        <NearCityHint step={step.toDto() as NearCityHintDto}></NearCityHint>
      );
    case "precise-description-hint":
      return (
        <PreciseDescriptionHint
          step={step.toDto() as PreciseDescriptionHintDto}
        ></PreciseDescriptionHint>
      );
    case "rebus-hint":
      return <RebusHint step={step.toDto() as RebusHintDto}></RebusHint>;
    case "shoes-hint":
      return <ShoesHint step={step.toDto() as ShoesHintDto}></ShoesHint>;
    case "state-hint":
      return <StateHint step={step.toDto() as StateHintDto}></StateHint>;
    case "tourism-hint":
      return <TourismHint step={step.toDto() as TourismHintDto}></TourismHint>;
    case "weather-hint":
      return <WeatherHint step={step.toDto() as WeatherHintDto}></WeatherHint>;
    case "attraction-challenge":
      return (
        <AttractionChallenge
          challenge={step as Challenge}
        ></AttractionChallenge>
      );
    case "5-blue-car-challenge":
      return (
        <BlueCar5Challenge challenge={step as Challenge}></BlueCar5Challenge>
      );
    case "change-wheel-challenge":
      return (
        <ChangeWheelChallenge
          challenge={step as Challenge}
        ></ChangeWheelChallenge>
      );
    case "compliment-challenge":
      return (
        <ComplimentChallenge
          challenge={step as Challenge}
        ></ComplimentChallenge>
      );
    case "fuel-stop-challenge":
      return (
        <FuelStopChallenge challenge={step as Challenge}></FuelStopChallenge>
      );
    case "nose-challenge":
      return <NoseChallenge challenge={step as Challenge}></NoseChallenge>;
    case "potatoe-challenge":
      return (
        <PotatoeChallenge challenge={step as Challenge}></PotatoeChallenge>
      );
    case "push-car-challenge":
      return (
        <PushCarChallenge challenge={step as Challenge}></PushCarChallenge>
      );
    case "state-product-challenge":
      return (
        <StateProductChallenge
          challenge={step as Challenge}
        ></StateProductChallenge>
      );
    case "5-toyota-challenge":
      return (
        <Toyota5Challenge challenge={step as Challenge}></Toyota5Challenge>
      );
    default:
      return <></>;
  }
}
