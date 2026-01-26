import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import GeneratingTripButton from "../../components/features/new-trip/GeneratingTripButton";
import { colors } from "../../constants/style/colors";
import useTripApi from "../../hooks/features/trip/useTripApi";

export default function NewTripPage() {
  const glob = useGlobalSearchParams();
  const { startLat, startLon, userLocation, distanceTrip } =
    useLocalSearchParams<{
      startLat?: string;
      startLon?: string;
      userLocation?: string;
      distanceTrip?: string;
    }>();
  const { createTrip } = useTripApi();

  useEffect(() => {
    console.log(startLat, startLon, userLocation, distanceTrip);
    console.log(glob);
  }, [startLat, startLon, userLocation, distanceTrip]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
      <OutlineButton
        content={userLocation ? "Votre position actuelle" : "Départ"}
        prependIcon={
          <ExpoIcon
            name="circle-o"
            size={20}
            style={{
              color: startLat && startLon ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: startLat && startLon ? colors.black : colors.gray[500],
        }}
        onPress={() => {
          router.push("/new-trip/location-selector");
        }}
      ></OutlineButton>
      <OutlineButton
        content={distanceTrip ? `${distanceTrip} km` : "Taille du voyage"}
        prependIcon={
          <ExpoIcon
            name="arrows-h"
            size={20}
            style={{
              color: distanceTrip ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: distanceTrip ? colors.black : colors.gray[500],
        }}
        onPress={() => {
          router.push("/new-trip/distance-selector");
        }}
      ></OutlineButton>
      <GeneratingTripButton
        activated={!!(startLat && startLon && distanceTrip)}
        onPress={async () => {
          if (startLat && startLon && distanceTrip) {
            await createTrip({
              startPos: [parseFloat(startLat), parseFloat(startLon)],
              distanceTrip: parseInt(distanceTrip),
            });
          }
        }}
      ></GeneratingTripButton>
    </View>
  );
}
