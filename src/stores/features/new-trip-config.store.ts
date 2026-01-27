import { create } from "zustand";

const DEFAULT_STATE: State = {
  startingLat: undefined,
  startingLon: undefined,
  userLocation: undefined,
  distanceMax: 600,
  distanceMin: undefined,
};

type State = {
  startingLat?: number;
  startingLon?: number;
  userLocation?: boolean;
  distanceMax?: number;
  distanceMin?: number;
};

type Action = {
  updateStartingPos: (
    startingLat: State["startingLat"],
    startingLon: State["startingLon"],
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
    updateStartingPos: (startingLat, startingLon, userLocation) =>
      set({ startingLat, startingLon, userLocation }),

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
