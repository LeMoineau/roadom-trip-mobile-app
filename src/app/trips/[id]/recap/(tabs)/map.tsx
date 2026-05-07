import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { MapShapeType } from "react-native-leaflet-view";
import LeafletMap from "../../../../../components/common/misc/leaflet-map/LeafletMap";
import LoadingPage from "../../../../../components/common/misc/LoadingPage";
import useTripRepository from "../../../../../hooks/features/trip/useTripRepository";
import { GeoPoint } from "../../../../../shared/models/GeoPoint.model";
import { ArrayUtils } from "../../../../../shared/utils/array.utils";
import { GeoUtils } from "../../../../../shared/utils/geo.utils";

export default function TripMapRecapPage() {
  const [centerPoint, setCenterPoint] = useState<GeoPoint>();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { trip } = useTripRepository({ id });

  useEffect(() => {
    if (!!trip) {
      setCenterPoint(
        GeoUtils.getMiddlePoint(
          new GeoPoint(trip.startingPos),
          new GeoPoint(trip.endingPos),
        ),
      );
    }
  }, [trip]);

  if (!!!trip) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <View style={{ flex: 1 }}>
      <LeafletMap
        defaultZoom={7}
        defaultPos={
          centerPoint
            ? {
                latitude: centerPoint?.lat,
                longitude: centerPoint?.lon,
              }
            : undefined
        }
        mapMarkers={[
          {
            id: "starting-pos-marker", // The ID attached to the marker. It will be returned when onMarkerClicked is called
            position: {
              lat: [trip.startingPos.lat],
              lng: [trip.startingPos.lon],
            }, // Latitude and Longitude of the marker
            icon: "📍", // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
            size: [32, 32],
            iconAnchor: [0, 42],
          },
          {
            id: "ending-pos-marker", // The ID attached to the marker. It will be returned when onMarkerClicked is called
            position: {
              lat: [trip.endingPos.lat],
              lng: [trip.endingPos.lon],
            }, // Latitude and Longitude of the marker
            icon: "🏁", // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
            size: [32, 32],
            iconAnchor: [-10, 42],
          },
        ]}
        mapShapes={[
          ...ArrayUtils.itemOrVoid(
            trip.getRoutePolyline()?.map((p, index) => ({
              shapeType: MapShapeType.POLYLINE,
              color: "red",
              positions: p,
              id: "preferred-route-" + index,
            })),
          ),
          {
            shapeType: MapShapeType.POLYLINE,
            color: "blue",
            positions: [...trip.traveledRoute.map((pt) => [pt.lat, pt.lon])],
            id: "traveled-route",
          },
        ]}
      ></LeafletMap>
    </View>
  );
}
