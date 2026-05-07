import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { MapShapeType } from "react-native-leaflet-view";
import LeafletMap from "../../../../components/common/misc/leaflet-map/LeafletMap";
import LoadingPage from "../../../../components/common/misc/LoadingPage";
import useTripRepository from "../../../../hooks/features/trip/useTripRepository";
import { ArrayUtils } from "../../../../shared/utils/array.utils";

export default function TripMapTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip } = useTripRepository({ id });

  if (!!!trip) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap
        mapMarkers={[
          ...ArrayUtils.itemOrVoid({
            id: "starting-center-marker", // The ID attached to the marker. It will be returned when onMarkerClicked is called
            position: {
              lat: [trip.startingPos.lat],
              lng: [trip.startingPos.lon],
            }, // Latitude and Longitude of the marker
            icon: "📍", // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
            size: [32, 32],
            iconAnchor: [0, 42],
          }),
        ]}
        mapShapes={[
          {
            shapeType: MapShapeType.POLYLINE,
            color: "red",
            positions: [trip.traveledRoute.map((p) => [p.lat, p.lon])],
            id: "user-itineraire",
          },
        ]}
      ></LeafletMap>
    </View>
  );
}
