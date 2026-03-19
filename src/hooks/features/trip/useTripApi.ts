import { useState } from "react";
import { Trip } from "../../../models/features/trip.model";
import roadomTripApiService from "../../../services/roadom-trip-api.service";
import { CreatingTripRequest } from "../../../shared/types/dto/trip/CreatingTripRequest";

export default function useTripApi() {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState<Trip>();
  const [error, setError] = useState<Error>();

  const createTrip = async (
    req: CreatingTripRequest,
  ): Promise<Trip | undefined> => {
    setLoading(true);
    const tripDto = await roadomTripApiService.createTrip(req).catch((err) => {
      setError(err);
      return undefined;
    });
    setLoading(false);
    let trip;
    if (!!tripDto) {
      trip = new Trip(tripDto);
      setError(undefined);
      setTrip(trip);
    }
    return trip;
  };

  return { loading, error, trip, createTrip };
}
