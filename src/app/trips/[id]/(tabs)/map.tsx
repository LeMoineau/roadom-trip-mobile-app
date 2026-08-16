import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { MapShapeType } from "react-native-leaflet-view";
import FloatingButton from "../../../../components/common/buttons/FloatingButton";
import ExpoIcon from "../../../../components/common/icons/ExpoIcon";
import LeafletMap from "../../../../components/common/misc/leaflet-map/LeafletMap";
import LoadingPage from "../../../../components/common/misc/LoadingPage";
import { colors } from "../../../../constants/style/colors";
import useUserLocation from "../../../../hooks/common/use-user-location";
import useTripRepository from "../../../../hooks/features/trip/useTripRepository";
import { GeoPoint } from "../../../../shared/models/GeoPoint.model";
import { ArrayUtils } from "../../../../shared/utils/array.utils";
import { DateUtils } from "../../../../shared/utils/date.utils";

export default function TripMapTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip, updateTrip } = useTripRepository({ id });
  const { userLocationLoading, getLocation } = useUserLocation();

  if (!!!trip) {
    return <LoadingPage></LoadingPage>;
  }

  /**
   * Get the current location of the user and adding it in trip
   */
  const handleAddingCurrentUserLocation = () => {
    if (!!userLocationLoading) return;
    getLocation().then((res) => {
      if (!!res) {
        trip.addPointInTraveledRoute(
          new GeoPoint({
            lat: res.coords.latitude,
            lon: res.coords.longitude,
            label: DateUtils.toHHmmDDMMYY(new Date()),
          }),
        );
        updateTrip(trip);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap
        defaultPos={
          !!trip.lastTraveledPoint
            ? {
                latitude: trip.lastTraveledPoint.lat,
                longitude: trip.lastTraveledPoint.lon,
              }
            : {
                latitude: trip.startingPos.lat,
                longitude: trip.startingPos.lon,
              }
        }
        putMarkerAtStartingCenter={false}
        mapMarkers={[
          ...ArrayUtils.itemOrVoid({
            id: "starting-center-marker",
            position: {
              lat: [trip.startingPos.lat],
              lng: [trip.startingPos.lon],
            },
            icon: "🏠",
            size: [32, 32],
            iconAnchor: [0, 42],
          }),
          ...trip.traveledRoute.map((pt, index) => {
            return {
              id: `pt-${index}`,
              position: {
                lat: [pt.lat],
                lng: [pt.lon],
              },
              icon:
                (pt.displayIcon ?? index === trip.traveledRoute.length - 1)
                  ? "🚗"
                  : "📍",
              size: [32, 32],
              iconAnchor: [0, 42],
            };
          }),
        ]}
        mapShapes={[
          {
            shapeType: MapShapeType.POLYLINE,
            color: "red",
            positions: [
              [trip.startingPos.lat, trip.startingPos.lon],
              ...trip.traveledRoute.map((p) => [p.lat, p.lon]),
            ],
            id: "user-itineraire",
          },
        ]}
      ></LeafletMap>
      {!!!trip.ended && (
        <FloatingButton
          appendIcon={
            <ExpoIcon
              name="my-location"
              style={{ color: colors.white }}
              size={20}
            ></ExpoIcon>
          }
          content="Enregistrer position actuelle"
          style={{ borderRadius: 100 }}
          onPress={handleAddingCurrentUserLocation}
        ></FloatingButton>
      )}
    </View>
  );
}
