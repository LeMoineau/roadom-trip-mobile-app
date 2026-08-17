import { RelativePathString, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingButton from "../../components/common/buttons/FloatingButton";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import LeafletMap from "../../components/common/misc/leaflet-map/LeafletMap";
import { colors } from "../../constants/style/colors";
import useUserLocation from "../../hooks/common/use-user-location";
import osmService from "../../services/osm.service";
import { GeoPoint } from "../../shared/models/GeoPoint.model";
import { GeoPointDto } from "../../shared/types/dto/geo/GeoPoint.dto";
import { OSMSearchResponse } from "../../shared/types/osm/OSMSearchResponse";

/**
 * Take severals query param to return a GeoPointDto from the user
 * @param defaultPos default position on the map
 * @param posValueKey key of the wanted returned query param which will contain the user selected position
 * @param callbackUrl callback url where send result query param
 * @param resetable to define if the position can be removed. It will return the string value "null" if the position is reset
 */
export default function LocationSelectorPage() {
  const { defaultPos, posValueKey, callbackUrl, resetable } =
    useLocalSearchParams<{
      defaultPos?: string;
      posValueKey: string;
      callbackUrl: string;
      resetable?: string;
    }>();
  const inputRef = useRef<TextInput>(null);
  const [selectedPos, setSelectedPos] = useState<[number, number]>();
  const [selectedPosName, setSelectedPosName] = useState<string>();
  const { userLocationLoading, getLocation } = useUserLocation();
  const [queryLoading, setQueryLoading] = useState(false);

  /**
   * Get the current location of the user and redirect to new-trip index
   */
  const handleGettingUserLocation = () => {
    if (!!userLocationLoading) return;
    getLocation()
      .then((res) => {
        const resPt = new GeoPoint({
          lat: res.coords.latitude,
          lon: res.coords.longitude,
          label: "Votre position géolocalisée",
        });
        router.dismissTo({
          pathname: callbackUrl as RelativePathString,
          params: {
            [posValueKey]: JSON.stringify(resPt.toDto()),
          },
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
    const resPt = new GeoPoint({
      lat: selectedPos[0],
      lon: selectedPos[1],
    });
    router.dismissTo({
      pathname: callbackUrl as RelativePathString,
      params: {
        [posValueKey]: JSON.stringify(resPt.toDto()),
      },
    });
  };

  /**
   * Reset the selected position and redirect to new-trip index
   */
  const handleSendingResetedPosition = () => {
    router.dismissTo({
      pathname: callbackUrl as RelativePathString,
      params: {
        [posValueKey]: "null",
      },
    });
  };

  const handleSearchResponse = (res?: OSMSearchResponse[]) => {
    if (!!res && res.length > 0 && !!res[0].lat && !!res[0].lon) {
      try {
        setSelectedPos([parseFloat(res[0].lat), parseFloat(res[0].lon)]);
        setSelectedPosName(res[0].display_name);
      } catch (err) {
        console.error("error during parse of osm search response lat/lon");
      }
    }
  };

  /**
   * Check if the actuel selected pos is the same as the position pass through params (so the
   * previously saved position)
   */
  const _actualSelectedPosIsParamPos = () => {
    if (!!!selectedPos || !!!defaultPos) return false;
    try {
      const _defaultPos = JSON.parse(defaultPos) as GeoPointDto;
      return (
        _defaultPos.lat === selectedPos[0] && _defaultPos.lon === selectedPos[1]
      );
    } catch (err) {
      return false;
    }
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
    try {
      if (!!defaultPos) {
        const parsedDefaultPos = JSON.parse(defaultPos) as GeoPointDto;
        setSelectedPos([parsedDefaultPos.lat, parsedDefaultPos.lon]);
      }
    } catch (err) {
      console.error(
        `error during parsing of defaultPos "${defaultPos}" of location selector`,
      );
    }
  }, [defaultPos]);

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
            color: colors.black,
            opacity: queryLoading ? 0.7 : 1,
          }}
          value={selectedPosName}
          placeholder="2 Rue de la gare"
          placeholderTextColor={colors.gray[500]}
          onChangeText={setSelectedPosName}
          onSubmitEditing={(evt) => {
            const query = evt.nativeEvent.text.trim();
            if (!!query && query.length > 0) {
              setQueryLoading(true);
              osmService
                .search({ q: evt.nativeEvent.text })
                .then((res) => {
                  handleSearchResponse(res);
                  // if (res?.display_name)  = res.display_name
                })
                .finally(() => setQueryLoading(false));
            }
          }}
          editable={!queryLoading}
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
                name={"close"}
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
