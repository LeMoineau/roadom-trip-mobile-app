import { Step } from "../../../models/features/step.model";
import { AttractionChallengeDto } from "../../../shared/types/dto/challenges/AttractionChallenge.dto";
import { BlueCar5ChallengeDto } from "../../../shared/types/dto/challenges/BlueCar5Challenge.dto";
import { ChangeWheelChallengeDto } from "../../../shared/types/dto/challenges/ChangeWheelChallenge.dto";
import { ComplimentChallengeDto } from "../../../shared/types/dto/challenges/ComplimentChallenge.dto";
import { FuelStopChallengeDto } from "../../../shared/types/dto/challenges/FuelStopChallenge.dto";
import { NoseChallengeDto } from "../../../shared/types/dto/challenges/NoseChallenge.dto";
import { PotatoeChallengeDto } from "../../../shared/types/dto/challenges/PotatoeChallenge.dto";
import { PushCarChallengeDto } from "../../../shared/types/dto/challenges/PushCarChallenge.dto";
import { StateProductChallengeDto } from "../../../shared/types/dto/challenges/StateProductChallenge.dto";
import { Toyota5ChallengeDto } from "../../../shared/types/dto/challenges/Toyota5Challenge.dto";
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
          step={step.toDto() as AttractionChallengeDto}
        ></AttractionChallenge>
      );
    case "5-blue-car-challenge":
      return (
        <BlueCar5Challenge
          step={step.toDto() as BlueCar5ChallengeDto}
        ></BlueCar5Challenge>
      );
    case "change-wheel-challenge":
      return (
        <ChangeWheelChallenge
          step={step.toDto() as ChangeWheelChallengeDto}
        ></ChangeWheelChallenge>
      );
    case "compliment-challenge":
      return (
        <ComplimentChallenge
          step={step.toDto() as ComplimentChallengeDto}
        ></ComplimentChallenge>
      );
    case "fuel-stop-challenge":
      return (
        <FuelStopChallenge
          step={step.toDto() as FuelStopChallengeDto}
        ></FuelStopChallenge>
      );
    case "nose-challenge":
      return (
        <NoseChallenge step={step.toDto() as NoseChallengeDto}></NoseChallenge>
      );
    case "potatoe-challenge":
      return (
        <PotatoeChallenge
          step={step.toDto() as PotatoeChallengeDto}
        ></PotatoeChallenge>
      );
    case "push-car-challenge":
      return (
        <PushCarChallenge
          step={step.toDto() as PushCarChallengeDto}
        ></PushCarChallenge>
      );
    case "state-product-challenge":
      return (
        <StateProductChallenge
          step={step.toDto() as StateProductChallengeDto}
        ></StateProductChallenge>
      );
    case "5-toyota-challenge":
      return (
        <Toyota5Challenge
          step={step.toDto() as Toyota5ChallengeDto}
        ></Toyota5Challenge>
      );
    default:
      return <></>;
  }
}
