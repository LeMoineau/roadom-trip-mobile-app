import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/common/buttons/FloatingButton";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import LeafletMap from "../../components/common/misc/leaflet-map/LeafletMap";
import { colors } from "../../constants/style/colors";
import useUserLocation from "../../hooks/common/use-user-location";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { useNewTripConfigStore } from "../../stores/features/new-trip/new-trip-config.store";

export default function LocationSelectorPage() {
  const { currentPos, posType, resetable } = useLocalSearchParams<{
    currentPos?: string;
    posType?: "starting" | "ending";
    resetable?: string;
  }>();
  const inputRef = useRef<TextInput>(null);
  const [selectedPos, setSelectedPos] = useState<[number, number]>();
  const updateStartingPos = useNewTripConfigStore(
    (state) => state.updateStartingPos,
  );
  const updateEndingPos = useNewTripConfigStore(
    (state) => state.updateEndingPos,
  );
  const { userLocationLoading, getLocation } = useUserLocation();

  /**
   * Get the current location of the user and redirect to new-trip index
   */
  const handleGettingUserLocation = () => {
    if (!!userLocationLoading) return;
    getLocation()
      .then((res) => {
        _updatePosition({
          lat: res.coords.latitude,
          lon: res.coords.longitude,
          label: "Votre position géolocalisée",
        });
        router.dismissTo({
          pathname: "/new-trip",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Save the position on the map selected by the user and redirect to new-trip index
   */
  const handleSendingSelectedPosition = () => {
    if (!selectedPos) return;
    _updatePosition({ lat: selectedPos[0], lon: selectedPos[1] });
    router.dismissTo({
      pathname: "/new-trip",
    });
  };

  /**
   * Reset the selected position and redirect to new-trip index
   */
  const handleSendingResetedPosition = () => {
    _updatePosition({});
    router.dismissTo({
      pathname: "/new-trip",
    });
  };

  const _updatePosition = ({
    lat,
    lon,
    label,
    userLocation,
  }: {
    lat?: number;
    lon?: number;
    label?: string;
    userLocation?: boolean;
  }) => {
    const newPos =
      lat && lon
        ? new GeoPoint({
            lat,
            lon,
            label: label ?? (posType === "ending" ? "Arrivée" : "Départ"),
          }).toDto()
        : undefined;
    if (posType === "ending") {
      updateEndingPos(newPos, userLocation);
    } else {
      updateStartingPos(newPos, userLocation);
    }
  };

  const _parseCurrentPosParam = (): [number, number] | undefined => {
    if (!currentPos) return;
    try {
      const parsedPos = JSON.parse(currentPos);
      if (parsedPos && Array.isArray(parsedPos) && parsedPos.length >= 2) {
        try {
          return [parseFloat(parsedPos[0]), parseFloat(parsedPos[1])];
        } catch (err) {
          console.error(
            `error during converting current pos ${parsedPos} into [number, number]`,
            err,
          );
        }
      }
    } catch (err) {
      console.error(
        `error during converting current pos ${currentPos} into array`,
        err,
      );
    }
  };

  /**
   * Check if the actuel selected pos is the same as the position pass through params (so the
   * previously saved position)
   */
  const _actualSelectedPosIsParamPos = () => {
    if (!!!selectedPos) return false;
    const _currentPos = _parseCurrentPosParam();
    if (!!!_currentPos) return false;
    return (
      _currentPos[0] === selectedPos[0] && _currentPos[1] === selectedPos[1]
    );
  };

  /**
   * Focus search bar at mounting
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /**
   * Get previously selected pos if exists from url params
   */
  useEffect(() => {
    const _currentPos = _parseCurrentPosParam();
    if (!!_currentPos) {
      setSelectedPos(_currentPos);
    }
  }, [currentPos]);

  return (
    <SafeAreaView edges={{ top: "off" }} style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 20,
          paddingTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[300],
          zIndex: 100,
        }}
      >
        <TextInput
          ref={inputRef}
          style={{
            backgroundColor: colors.gray[50],
            borderWidth: 1,
            borderColor: colors.gray[200],
            padding: 20,
            borderRadius: 20,
          }}
          placeholder="Rue de la gare"
        ></TextInput>
        <OutlineButton
          content="Utiliser votre géolocalisation"
          prependIcon={<ExpoIcon name="locate" size={20}></ExpoIcon>}
          style={{
            borderWidth: 0,
            borderColor: colors.gray[300],
            borderRadius: 20,
            opacity: userLocationLoading ? 0.5 : 1,
            backgroundColor: colors.white,
            padding: 20,
          }}
          textContainerStyle={{ gap: 15 }}
          appendIcon={
            userLocationLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <ExpoIcon name="chevron-forward" size={20}></ExpoIcon>
            )
          }
          onPress={handleGettingUserLocation}
        ></OutlineButton>
      </View>
      <LeafletMap
        defaultPos={
          selectedPos
            ? { latitude: selectedPos[0], longitude: selectedPos[1] }
            : undefined
        }
        putMarkerOnPress
        putMarkerAtStartingCenter={!!selectedPos}
        onPressPosition={setSelectedPos}
      ></LeafletMap>
      {selectedPos &&
        (resetable && _actualSelectedPosIsParamPos() ? (
          <FloatingButton
            bgColor={colors.gray[400]}
            content={"Annuler la sélection"}
            appendIcon={
              <ExpoIcon
                name={"cancel"}
                size={20}
                style={{ color: colors.white }}
              ></ExpoIcon>
            }
            onPress={handleSendingResetedPosition}
          ></FloatingButton>
        ) : (
          <FloatingButton
            content={"Valider la position"}
            appendIcon={
              <ExpoIcon
                name={"arrow-forward"}
                size={20}
                style={{ color: colors.white }}
              ></ExpoIcon>
            }
            onPress={handleSendingSelectedPosition}
          ></FloatingButton>
        ))}
    </SafeAreaView>
  );
}
