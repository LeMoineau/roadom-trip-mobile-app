import { View } from "react-native";
import { MapShapeType } from "react-native-leaflet-view";
import LeafletMap from "../../../../components/common/misc/LeafletMap";

export default function TripMapTab() {
  return (
    <View style={{ flex: 1 }}>
      <LeafletMap
        mapShapes={[
          {
            shapeType: MapShapeType.POLYLINE,
            color: "red",
            positions: [
              [48.11585637673801, -1.6728242249528116],
              [48.11585637673801, -2.6728242249528116],
              [47.11585637673801, -2.6728242249528116],
            ],
            id: "user-itineraire",
          },
        ]}
      ></LeafletMap>
    </View>
  );
}
