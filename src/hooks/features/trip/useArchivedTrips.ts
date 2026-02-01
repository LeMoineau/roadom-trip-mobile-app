import { useEffect, useState } from "react";
import { storageKeys } from "../../../config/storage-keys";
import { Trip } from "../../../shared/models/Trip.model";
import { isTripDto, TripDto } from "../../../shared/types/dto/trip/Trip.dto";
import useStorage from "../../common/use-storage";

export default function useArchivedTrips() {
  const { getJson } = useStorage();
  const [archivedTrips, setArchivedTrips] = useState<Trip[]>();

  useEffect(() => {
    loadArchivedTrips();
  }, []);

  const loadArchivedTrips = async () => {
    const trips = (await getJson(storageKeys.ARCHIVED_TRIPS)) as TripDto[];
    if (!!!trips) return;
    setArchivedTrips([
      ...trips.filter((t) => isTripDto(t)).map((t) => new Trip(t)),
    ]);
  };

  return { archivedTrips, loadArchivedTrips };
}
