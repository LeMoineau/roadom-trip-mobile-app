import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect } from "react";
import { Alert, View } from "react-native";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import GeneratingTripButton from "../../components/features/new-trip/GeneratingTripButton";
import { colors } from "../../constants/style/colors";
import { ToastContext } from "../../contexts/contexts";
import useArchivedTrips from "../../hooks/features/trip/useArchivedTrips";
import useTripApi from "../../hooks/features/trip/useTripApi";
import { useNewTripConfigStore } from "../../stores/features/new-trip/new-trip-config.store";
import { useTripStore } from "../../stores/features/trip/trip.store";

export default function NewTripPage() {
  const {
    startingPos: paramStartingPos,
    endingPos: paramEndingPos,
    distanceMax: paramDistanceMax,
  } = useLocalSearchParams<{
    startingPos?: string;
    endingPos?: string;
    distanceMax?: string;
  }>();

  const {
    startingPos,
    endingPos,
    distanceMax,
    distanceMin,
    reset,
    updateDistance,
    updateEndingPos,
    updateStartingPos,
  } = useNewTripConfigStore();
  const { showToast } = useContext(ToastContext);

  const { loading, trip: beingCreatedTrip, error, createTrip } = useTripApi();
  const { archiveTrip } = useArchivedTrips();
  const updateTrip = useTripStore((state) => state.updateTrip);
  const trip = useTripStore((state) => state.trip);

  useEffect(() => {
    if (!!paramStartingPos) updateStartingPos(JSON.parse(paramStartingPos));
  }, [paramStartingPos]);

  useEffect(() => {
    if (!!paramEndingPos) {
      updateEndingPos(
        paramEndingPos !== "null" ? JSON.parse(paramEndingPos) : undefined,
      );
    }
  }, [paramEndingPos]);

  useEffect(() => {
    if (!!paramDistanceMax) {
      updateDistance(
        "max",
        paramDistanceMax !== "null" ? parseInt(paramDistanceMax) : undefined,
      );
    }
  }, [paramDistanceMax]);

  useEffect(() => {
    if (!!beingCreatedTrip) {
      if (!!trip) {
        trip.finish();
        archiveTrip(trip);
      }
      updateTrip(beingCreatedTrip);
      reset();
      router.dismissTo({
        pathname: "..",
        params: { newTripCreated: beingCreatedTrip.id },
      });
      showToast({
        message: "Nouveau road-trip généré !",
        bgColor: colors.green[500],
        duration: 3000,
      });
    }
  }, [beingCreatedTrip]);

  useEffect(() => {
    if (!!error) {
      showToast({
        message: error.message,
        bgColor: colors.red[400],
        textColor: colors.white,
        duration: 3000,
      });
    }
  }, [error]);

  const handlePressingStartingPosBtn = () => {
    router.push({
      pathname: "/new-trip/location-selector",
      params: {
        defaultPos: startingPos ? JSON.stringify(startingPos) : undefined,
        posValueKey: "startingPos",
        callbackUrl: "/new-trip",
      },
    });
  };

  const handlePressingEndingPosBtn = () => {
    const _redirect = () => {
      router.push({
        pathname: "/new-trip/location-selector",
        params: {
          defaultPos: endingPos ? JSON.stringify(endingPos) : undefined,
          posValueKey: "endingPos",
          callbackUrl: "/new-trip",
          resetable: "true",
        },
      });
    };
    if (!!!distanceMax) {
      _redirect();
    } else {
      Alert.alert(
        "Destination du Road-Trip",
        "Vous avez déjà renseigné une distance maximale pour ce road-trip. Voulez-vous quand même indiquer aussi une point d'arrivée (la distance maximale sera ignorée) ?",
        [
          {
            text: "Non",
            style: "cancel",
          },
          {
            text: "Oui",
            onPress: _redirect,
          },
        ],
      );
    }
  };

  const handlePressingDistanceMaxBtn = () => {
    const _redirect = () => {
      router.push({
        pathname: "/new-trip/distance-selector",
        params: {
          defaultValue: distanceMax,
          callbackUrl: "/new-trip",
          valueKey: "distanceMax",
          displayTitle:
            "Combien de km êtes-vous prêt à parcourir pour cette aventure ?",
        },
      });
    };
    if (!!!endingPos) {
      _redirect();
    } else {
      Alert.alert(
        "Destination du Road-Trip",
        "Vous avez déjà renseigné un point d'arrivée pour ce road-trip. Voulez-vous quand même indiquer aussi une distance maximale (elle ne sera pas prise en compte) ?",
        [
          {
            text: "Non",
            style: "cancel",
          },
          {
            text: "Oui",
            onPress: _redirect,
          },
        ],
      );
    }
  };

  const handlePressingMoreOptionsBtn = () => {
    router.push({
      pathname: "/new-trip/more-options",
      params: { distanceMin },
    });
  };

  const handleSubmit = async (activated?: boolean) => {
    if (!!!startingPos || (!!!distanceMax && !!!endingPos) || !!!activated) {
      showToast({
        message:
          "Veuillez renseigner au moins le point de départ et la distance maximale ou le point d'arrivée",
        bgColor: colors.red[500],
        duration: 3000,
      });
      return;
    }
    try {
      createTrip({
        startingPos,
        endingPos,
        distanceMax,
        distanceMin,
      });
    } catch (err) {
      console.error("error during parsing creation trip params");
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
      <OutlineButton
        content={startingPos?.label ?? "Départ"}
        prependIcon={
          <ExpoIcon
            name={startingPos ? "check-circle-o" : "circle-o"}
            size={20}
            style={{
              color: startingPos ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: startingPos ? colors.black : colors.gray[500],
        }}
        onPress={handlePressingStartingPosBtn}
      ></OutlineButton>
      <OutlineButton
        content={endingPos?.label ?? "Arrivée"}
        prependIcon={
          <ExpoIcon
            name={endingPos ? "check-circle-o" : "circle-o"}
            size={20}
            style={{
              color: endingPos ? colors.black : colors.gray[500],
            }}
          ></ExpoIcon>
        }
        style={{ opacity: !!distanceMax && !!!endingPos ? 0.5 : 1 }}
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: endingPos ? colors.black : colors.gray[500],
        }}
        onPress={handlePressingEndingPosBtn}
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
        style={{ opacity: !!endingPos && !!!distanceMax ? 0.5 : 1 }}
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        textStyle={{
          color: distanceMax ? colors.black : colors.gray[500],
        }}
        onPress={handlePressingDistanceMaxBtn}
      ></OutlineButton>
      <OutlineButton
        content="Plus d'options"
        appendIcon={<ExpoIcon name="chevron-forward" size={20}></ExpoIcon>}
        onPress={handlePressingMoreOptionsBtn}
        style={{ width: "100%" }}
      ></OutlineButton>
      <GeneratingTripButton
        activated={
          !!startingPos &&
          (!!distanceMax || !!endingPos) &&
          (!!!distanceMin || !!!distanceMax || distanceMin < distanceMax)
        }
        loading={loading}
        onPress={handleSubmit}
      ></GeneratingTripButton>
    </View>
  );
}
