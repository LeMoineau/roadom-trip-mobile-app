import * as Location from "expo-location";
import { useState } from "react";

export default function useUserLocation() {
  const [userLocationLoading, setUserLocationLoading] = useState(false);

  const _requestUserLocation = async (): Promise<Location.LocationObject> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        throw new Error("permission denied");
      }

      return Location.getCurrentPositionAsync({});
    } catch (error) {
      throw new Error("Error requesting location permission");
    }
  };

  const getLocation = async (): Promise<Location.LocationObject> => {
    setUserLocationLoading(true);
    const res = await _requestUserLocation()
      .then((res) => {
        console.log("user location: ", res);
        return res;
      })
      .finally(() => {
        setUserLocationLoading(false);
      });
    return res;
  };

  return {
    userLocationLoading,
    getLocation,
  };
}
