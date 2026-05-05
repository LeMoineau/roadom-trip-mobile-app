import { useEffect, useState } from "react";
import { Trip } from "../../../models/features/trip.model";
import { useTripStore } from "../../../stores/features/trip/trip.store";
import useArchivedTrips from "./useArchivedTrips";

export default function useTripRepository({ id }: { id?: string }) {
  const [foundTrip, setTrip] = useState<Trip>();
  const trip = useTripStore((state) => state.trip);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const { archivedTrips, updateArchivedTrip } = useArchivedTrips();

  useEffect(() => {
    if (!!!id) return;
    if (!!trip && trip.id === id) {
      setTrip(trip);
    } else {
      setTrip(archivedTrips?.find((t) => t.id === id));
    }
  }, [trip, archivedTrips]);

  const getTrip = ({ id }: { id: string }) => {
    let res;
    if (!!trip && trip.id === id) {
      res = trip;
    } else {
      res = archivedTrips?.find((t) => t.id === id);
    }
    setTrip(res);
    return res;
  };

  const _updateTrip = (_trip: Trip) => {
    if (!!trip && trip.id === _trip.id) {
      updateTrip(_trip);
    } else if (!!archivedTrips) {
      const targetIndex = archivedTrips.findIndex((t) => t.id === id);
      if (targetIndex !== -1) {
        const tmpArchivedTrips = [...archivedTrips];
        tmpArchivedTrips[targetIndex] = _trip;
        updateArchivedTrip(tmpArchivedTrips);
      }
    }
  };

  return { trip: foundTrip, getTrip, updateTrip: _updateTrip };
}
