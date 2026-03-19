import { useEffect, useState } from "react";
import { storageKeys } from "../../../config/storage-keys";
import { isTripDto, TripDto } from "../../../shared/types/dto/trip/Trip.dto";
import useStorage from "../../common/use-storage";

export default function useStoredTrip() {
  const { saveJson, getJson } = useStorage();
  const [currentTrip, setCurrentTrip] = useState<TripDto>();
  const [refreshing, setRefresh] = useState(false);

  useEffect(() => {
    loadCurrentTrip();
  }, []);

  const saveCurrentTrip = async (tripDto: TripDto) => {
    if (currentTrip) {
      const archivedTrip = (await getJson(
        storageKeys.ARCHIVED_TRIPS,
      )) as TripDto[];
      if (!archivedTrip) {
        await saveJson(storageKeys.ARCHIVED_TRIPS, [currentTrip]);
      } else if (!archivedTrip.find((t) => t.id === currentTrip.id)) {
        await saveJson(storageKeys.ARCHIVED_TRIPS, [
          ...archivedTrip,
          currentTrip,
        ]);
      }
    }
    await saveJson(storageKeys.CURRENT_TRIP, tripDto);
  };

  const loadCurrentTrip = async () => {
    const tripDto = await getJson(storageKeys.CURRENT_TRIP);
    if (!!tripDto && isTripDto(tripDto)) {
      setCurrentTrip(tripDto);
    }
  };

  const refresh = async () => {
    setRefresh(true);
    await loadCurrentTrip();
    setRefresh(false);
  };

  return {
    refreshing,
    trip: currentTrip,
    saveCurrentTrip,
    loadCurrentTrip,
    refresh,
  };
}
