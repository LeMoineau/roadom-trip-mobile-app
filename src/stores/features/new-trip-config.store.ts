import { create } from "zustand";
import { GeoPointDto } from "../../shared/types/dto/geo/GeoPoint.dto";

const DEFAULT_STATE: State = {
  startingPos: undefined, // new GeoPoint({ lat: 48, lon: 5 }),
  userLocation: undefined,
  distanceMax: 600,
  distanceMin: undefined,
};

type State = {
  startingPos?: GeoPointDto;
  userLocation?: boolean;
  distanceMax?: number;
  distanceMin?: number;
};

type Action = {
  updateStartingPos: (
    startingPos: State["startingPos"],
    userLocation?: State["userLocation"],
  ) => void;
  updateDistance: (distance: number, type: "max" | "min") => void;
  reset: () => void;
};

export const useNewTripConfigStore = create<State & Action>((set) => {
  return {
    ...DEFAULT_STATE,

    /**
     * Update starting pos of the trip
     * @param startingLat
     * @param startingLon
     * @param userLocation
     * @returns
     */
    updateStartingPos: (startingPos, userLocation) =>
      set({ startingPos, userLocation }),

    /**
     * Update a distance depending of its type (max of min)
     * @param distance
     * @param type
     */
    updateDistance: (distance, type) => {
      if (type === "max") set({ distanceMax: distance });
      else set({ distanceMin: distance });
    },

    /**
     * Reset store state
     */
    reset: () => {
      set(DEFAULT_STATE);
    },
  };
});
