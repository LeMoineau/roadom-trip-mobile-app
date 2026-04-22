import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { MapShape } from "react-native-leaflet-view";
import { colors } from "../../../../constants/style/colors";
import OutlineButton from "../../buttons/OutlineButton";

const DEFAULT_LOCATION = {
  latitude: 48.11585637673801,
  longitude: -1.6728242249528116,
};

export default function LeafletMap({
  onPressPosition,
}: {
  defaultPos?: { latitude: number; longitude: number };
  defaultZoom?: number;
  putMarkerOnPress?: boolean;
  putMarkerAtStartingCenter?: boolean;
  mapShapes?: MapShape[];
  onPressPosition?: (pos: [number, number]) => void;
}) {
  const [latitude, setLatitude] = useState<string>(
    DEFAULT_LOCATION.latitude.toString(),
  );
  const [longitude, setLongitude] = useState<string>(
    DEFAULT_LOCATION.longitude.toString(),
  );

  return (
    <View style={{ display: "flex", gap: 10, padding: 20 }}>
      <TextInput
        style={{
          backgroundColor: colors.gray[50],
          borderWidth: 1,
          borderColor: colors.gray[200],
          padding: 20,
          borderRadius: 20,
        }}
        value={latitude}
        onChangeText={setLatitude}
        placeholder="Latitude"
      ></TextInput>
      <TextInput
        style={{
          backgroundColor: colors.gray[50],
          borderWidth: 1,
          borderColor: colors.gray[200],
          padding: 20,
          borderRadius: 20,
        }}
        value={longitude}
        onChangeText={setLongitude}
        placeholder="Longitude"
      ></TextInput>
      <OutlineButton
        content="Valider la position"
        onPress={() => {
          if (longitude.length > 0 && latitude.length > 0) {
            try {
              onPressPosition &&
                onPressPosition([parseFloat(latitude), parseFloat(longitude)]);
            } catch (err) {
              console.error("error parsing user lat/lon" + err);
            }
          }
        }}
      ></OutlineButton>
    </View>
  );
}
