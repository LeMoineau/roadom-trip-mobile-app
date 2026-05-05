import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { MapShapeType } from "react-native-leaflet-view";
import LeafletMap from "../../../../../components/common/misc/leaflet-map/LeafletMap";
import useTripRepository from "../../../../../hooks/features/trip/useTripRepository";
import { GeoPoint } from "../../../../../shared/models/GeoPoint.model";
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
        mapShapes={trip?.getRoutePolyline()?.map((p, index) => {
          return {
            shapeType: MapShapeType.POLYLINE,
            color: "red",
            positions: p,
            id: index + "",
          };
        })}
      ></LeafletMap>
    </View>
  );
}
