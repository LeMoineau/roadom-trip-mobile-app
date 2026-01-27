import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OutlineButton from "../../components/common/buttons/OutlineButton";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import { colors } from "../../constants/style/colors";
import { useNewTripConfigStore } from "../../stores/features/new-trip-config.store";

export default function LocationSelectorPage() {
  const inputRef = useRef<TextInput>(null);
  const [userLocationLoading, setUserLocationLoading] = useState(false);
  const updateStartingPos = useNewTripConfigStore(
    (state) => state.updateStartingPos,
  );

  const getLocation = async (): Promise<Location.LocationObject> => {
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
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
        content="Utiliser votre position actuelle"
        prependIcon={<ExpoIcon name="locate" size={20}></ExpoIcon>}
        style={{
          borderWidth: 0,
          borderColor: colors.gray[300],
          borderBottomWidth: 1,
          borderRadius: 0,
          paddingHorizontal: 10,
          opacity: userLocationLoading ? 0.5 : 1,
        }}
        textContainerStyle={{ gap: 15 }}
        appendIcon={
          userLocationLoading ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <ExpoIcon name="chevron-forward" size={20}></ExpoIcon>
          )
        }
        onPress={() => {
          setUserLocationLoading(true);
          getLocation()
            .then((res) => {
              console.log("user location: ", res);
              updateStartingPos(
                res.coords.latitude,
                res.coords.longitude,
                true,
              );
              router.dismissTo({
                pathname: "/new-trip",
              });
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setUserLocationLoading(false);
            });
        }}
      ></OutlineButton>
    </SafeAreaView>
  );
}
