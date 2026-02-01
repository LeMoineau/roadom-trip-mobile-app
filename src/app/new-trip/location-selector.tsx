import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/common/buttons/FloatingButton";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import LeafletMap from "../../components/common/misc/LeafletMap";
import { colors } from "../../constants/style/colors";
import useUserLocation from "../../hooks/common/use-user-location";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { useNewTripConfigStore } from "../../stores/features/new-trip-config.store";

export default function LocationSelectorPage() {
  const { currentPos } = useLocalSearchParams<{ currentPos?: string }>();
  const inputRef = useRef<TextInput>(null);
  const [selectedPos, setSelectedPos] = useState<[number, number]>();
  const updateStartingPos = useNewTripConfigStore(
    (state) => state.updateStartingPos,
  );
  const { userLocationLoading, getLocation } = useUserLocation();

  /**
   * Get the current location of the user and redirect to new-trip index
   */
  const handleGettingUserLocation = () => {
    getLocation()
      .then((res) => {
        updateStartingPos(
          new GeoPoint({
            lat: res.coords.latitude,
            lon: res.coords.longitude,
            label: "Votre position géolocalisée",
          }).toDto(),
          true,
        );
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
    updateStartingPos(
      new GeoPoint({
        lat: selectedPos[0],
        lon: selectedPos[1],
        label: "Position de départ",
      }).toDto(),
    );
    router.dismissTo({
      pathname: "/new-trip",
    });
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
    if (!currentPos) return;
    try {
      const parsedPos = JSON.parse(currentPos);
      if (parsedPos && Array.isArray(parsedPos) && parsedPos.length >= 2) {
        try {
          setSelectedPos([parseFloat(parsedPos[0]), parseFloat(parsedPos[1])]);
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
  }, [currentPos]);

  return (
    <SafeAreaView edges={{ top: "off" }} style={{ flex: 1 }}>
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
      <View
        style={{
          backgroundColor: colors.white,
          paddingHorizontal: 20,
          paddingTop: 50,
          borderBottomWidth: 1,
          borderBottomColor: colors.gray[300],
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
      {selectedPos && (
        <FloatingButton
          content="Valider la position"
          appendIcon={
            <ExpoIcon
              name="arrow-forward"
              size={20}
              style={{ color: colors.white }}
            ></ExpoIcon>
          }
          onPress={handleSendingSelectedPosition}
        ></FloatingButton>
      )}
    </SafeAreaView>
  );
}
