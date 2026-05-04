import { useEffect, useState } from "react";
import { storageKeys } from "../../../config/storage-keys";
import { Trip } from "../../../models/features/trip.model";
import { isTripDto, TripDto } from "../../../shared/types/dto/trip/Trip.dto";
import { useTripStore } from "../../../stores/features/trip/trip.store";
import useStorage from "../../common/use-storage";

export default function useArchivedTrips() {
  const { getJson, saveJson } = useStorage();
  const [archivedTrips, setArchivedTrips] = useState<Trip[]>();
  const resetTrip = useTripStore((state) => state.resetTrip);

  useEffect(() => {
    loadArchivedTrips();
  }, []);

  const loadArchivedTrips = async () => {
    const trips = (await getJson(storageKeys.ARCHIVED_TRIPS)) as TripDto[];
    if (!!!trips) return;
    setArchivedTrips([
      ...trips.filter((t) => isTripDto(t)).map((t) => new Trip(t)),
    ]);
    console.log("archived trips loaded");
  };

  const archiveTrip = (trip: Trip) => {
    console.log(trip.id + " archived");
    trip.archive();
    saveJson(storageKeys.ARCHIVED_TRIPS, [
      ...(archivedTrips?.map((t) => t.toDto()) ?? []),
      trip.toDto(),
    ]);
    setArchivedTrips([...(archivedTrips ?? []), trip]);
    resetTrip();
  };

  return { archivedTrips, loadArchivedTrips, archiveTrip };
}
