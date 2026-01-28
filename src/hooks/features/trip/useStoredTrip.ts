import { useEffect, useState } from "react";
import { storageKeys } from "../../../config/storage-keys";
import { Trip } from "../../../shared/models/Trip.model";
import { isTripDto, TripDto } from "../../../shared/types/dto/trip/Trip.dto";
import useStorage from "../../common/use-storage";

export default function useStoredTrip() {
  const { saveJson, getJson } = useStorage();
  const [currentTrip, setCurrentTrip] = useState<Trip>();

  useEffect(() => {
    loadCurrentTrip();
  }, []);

  const saveCurrentTrip = async (trip: Trip) => {
    await saveJson(storageKeys.CURRENT_TRIP, trip.toDto());
  };

  const loadCurrentTrip = async () => {
    const tripDto = await getJson(storageKeys.CURRENT_TRIP);
    console.log("tripdto loaded:", tripDto, isTripDto(tripDto));
    if (isTripDto(tripDto)) {
      setCurrentTrip(new Trip(tripDto as TripDto));
    }
  };

  return { trip: currentTrip, saveCurrentTrip, loadCurrentTrip };
}
