import { router } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import GeneratingTripButton from "../../components/features/new-trip/GeneratingTripButton";
import { colors } from "../../constants/style/colors";
import { ToastContext } from "../../contexts/contexts";
import useStoredTrip from "../../hooks/features/trip/useStoredTrip";
import useTripApi from "../../hooks/features/trip/useTripApi";
import { useNewTripConfigStore } from "../../stores/features/new-trip-config.store";

export default function NewTripPage() {
  // const { startingLat, startingLon, userLocation, distanceTrip } =
  //   useLocalSearchParams<{
  //     startingLat?: string;
  //     startLon?: string;
  //     userLocation?: string;
  //     distanceTrip?: string;
  //   }>();
  const startingLat = useNewTripConfigStore((state) => state.startingLat);
  const startingLon = useNewTripConfigStore((state) => state.startingLon);
  const userLocation = useNewTripConfigStore((state) => state.userLocation);
  const distanceMax = useNewTripConfigStore((state) => state.distanceMax);
  const distanceMin = useNewTripConfigStore((state) => state.distanceMin);
  const { showToast } = useContext(ToastContext);

  const { createTrip } = useTripApi();
  const { saveCurrentTrip } = useStoredTrip();

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
      <OutlineButton
        content={userLocation ? "Votre position actuelle" : "Départ"}
        prependIcon={
          <ExpoIcon
            name="circle-o"
            size={20}
            style={{
              color:
                startingLat && startingLon ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: startingLat && startingLon ? colors.black : colors.gray[500],
        }}
        onPress={() => {
          router.push("/new-trip/location-selector");
        }}
      ></OutlineButton>
      <OutlineButton
        content={distanceMax ? `${distanceMax} km` : "Distance max"}
        prependIcon={
          <ExpoIcon
            name="add-road"
            size={20}
            style={{
              color: distanceMax ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: distanceMax ? colors.black : colors.gray[500],
        }}
        onPress={() => {
          router.push({
            pathname: "/new-trip/distance-selector",
            params: { type: "max", defaultValue: distanceMax },
          });
        }}
      ></OutlineButton>
      <OutlineButton
        content={distanceMin ? `${distanceMin} km` : "Distance min"}
        prependIcon={
          <ExpoIcon
            name="remove-road"
            size={20}
            style={{
              color: distanceMin ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: distanceMin ? colors.black : colors.gray[500],
        }}
        onPress={() => {
          router.push({
            pathname: "/new-trip/distance-selector",
            params: { type: "min", defaultValue: distanceMin },
          });
        }}
      ></OutlineButton>
      <GeneratingTripButton
        activated={
          !!(
            startingLat &&
            startingLon &&
            distanceMax &&
            (!distanceMin || distanceMin < distanceMax)
          )
        }
        onPress={async () => {
          if (!startingLat || !startingLon || !distanceMax) return;
          await createTrip({
            startingPos: {
              lat: startingLat,
              lon: startingLon,
            },
            distanceMax,
            distanceMin,
          })
            .then(async (trip) => {
              await saveCurrentTrip(trip);
              router.dismissTo({
                pathname: "..",
                params: { newTripCreated: trip.id },
              });
              showToast({
                message: "Nouveau road-trip généré !",
                bgColor: colors.green[500],
                duration: 3000,
              });
            })
            .catch((err: Error) => {
              showToast({
                message: err.message,
                bgColor: colors.red[400],
                textColor: colors.white,
                duration: 3000,
              });
            });
        }}
      ></GeneratingTripButton>
    </View>
  );
}
