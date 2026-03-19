import { create } from "zustand";
import { storageKeys } from "../../../config/storage-keys";
import useStorage from "../../../hooks/common/use-storage";
import { Trip } from "../../../models/features/trip.model";
import { isTripDto } from "../../../shared/types/dto/trip/Trip.dto";

const DEFAULT_STATE: State = {
  trip: undefined,
};

type State = {
  trip?: Trip;
};

type Action = {
  updateTrip: (trip: Trip) => void;
  reset: () => void;
};

export const useTripStore = create<State & Action>((set) => {
  const { getJson, saveJson } = useStorage();

  getJson(storageKeys.CURRENT_TRIP).then((res) => {
    if (!!res && isTripDto(res)) {
      set({ trip: new Trip(res) });
    }
  });

  return {
    ...DEFAULT_STATE,

    /**
     * Update current trip
     * @param trip
     */
    updateTrip(trip: Trip) {
      const updatedTrip = new Trip(trip.toDto());
      set({ trip: updatedTrip });
      saveJson(storageKeys.CURRENT_TRIP, updatedTrip.toDto());
    },

    /**
     * Reset store state
     */
    reset: () => {
      set(DEFAULT_STATE);
    },
  };
});
