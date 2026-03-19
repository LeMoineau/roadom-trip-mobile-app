import { useState } from "react";
import roadomTripApiService from "../../../services/roadom-trip-api.service";
import { CreatingTripRequest } from "../../../shared/types/dto/trip/CreatingTripRequest";
import { TripDto } from "../../../shared/types/dto/trip/Trip.dto";

export default function useTripApi() {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState<TripDto>();
  const [error, setError] = useState<Error>();

  const createTrip = async (
    req: CreatingTripRequest,
  ): Promise<TripDto | undefined> => {
    setLoading(true);
    const trip = await roadomTripApiService.createTrip(req).catch((err) => {
      setError(err);
      return undefined;
    });
    setLoading(false);
    if (!!trip) {
      setError(undefined);
      setTrip(trip);
    }
    return trip;
  };

  return { loading, error, trip, createTrip };
}
