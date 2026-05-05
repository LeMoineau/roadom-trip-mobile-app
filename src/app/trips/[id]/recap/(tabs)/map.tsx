import { View } from "react-native";
import LeafletMap from "../../../../../components/common/misc/leaflet-map/LeafletMap.web";

export default function TripMapRecapPage() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
      <LeafletMap></LeafletMap>
    </View>
  );
}
