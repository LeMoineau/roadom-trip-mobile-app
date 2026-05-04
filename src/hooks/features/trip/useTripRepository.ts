import { useEffect, useState } from "react";
import { Trip } from "../../../models/features/trip.model";
import { useTripStore } from "../../../stores/features/trip/trip.store";
import useArchivedTrips from "./useArchivedTrips";

export default function useTripRepository({ id }: { id: string }) {
  const [foundTrip, setTrip] = useState<Trip>();
  const trip = useTripStore((state) => state.trip);
  const { archivedTrips } = useArchivedTrips();

  useEffect(() => {
    if (!!trip && trip.id === id) {
      setTrip(trip);
    } else {
      setTrip(archivedTrips?.find((t) => t.id === id));
      console.log(archivedTrips?.find((t) => t.id === id));
    }
  }, [trip, archivedTrips]);

  return { trip: foundTrip };
}
