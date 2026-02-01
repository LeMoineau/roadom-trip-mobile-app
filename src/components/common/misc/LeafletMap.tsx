import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { LeafletView } from "react-native-leaflet-view";

const DEFAULT_LOCATION = {
  latitude: 48.11585637673801,
  longitude: -1.6728242249528116,
};
const DEFAULT_ZOOM = 10;

export default function LeafletMap({
  defaultPos = DEFAULT_LOCATION,
  defaultZoom = DEFAULT_ZOOM,
  putMarkerOnPress,
  putMarkerAtStartingCenter,
  onPressPosition,
}: {
  defaultPos?: { latitude: number; longitude: number };
  defaultZoom?: number;
  putMarkerOnPress?: boolean;
  putMarkerAtStartingCenter?: boolean;
  onPressPosition?: (pos: [number, number]) => void;
}) {
  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  const [selectedPos, setSelectedPos] = useState<[number, number]>();

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require("./../../../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await new File(asset.localUri!).text();

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        console.error("Error loading HTML:", error);
      }
    };

    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!webViewContent) {
    return <ActivityIndicator size="large" />;
  }

  console.log(putMarkerAtStartingCenter, defaultPos);

  return (
    <LeafletView
      doDebug={false}
      mapMarkers={
        putMarkerAtStartingCenter
          ? [
              {
                id: "starting-center-marker", // The ID attached to the marker. It will be returned when onMarkerClicked is called
                position: {
                  lat: [defaultPos.latitude],
                  lng: [defaultPos.longitude],
                }, // Latitude and Longitude of the marker
                icon: "📍", // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
                size: [32, 32],
                iconAnchor: [0, 42],
              },
            ]
          : selectedPos
            ? [
                {
                  id: "new-selected-pos-marker", // The ID attached to the marker. It will be returned when onMarkerClicked is called
                  position: { lat: [selectedPos[0]], lng: [selectedPos[1]] }, // Latitude and Longitude of the marker
                  icon: "📍", // HTML element that will be displayed as the marker.  It can also be text or an SVG string.
                  size: [32, 32],
                  iconAnchor: [0, 42],
                },
              ]
            : undefined
      }
      source={{ html: webViewContent }}
      mapCenterPosition={{
        lat: defaultPos.latitude,
        lng: defaultPos.longitude,
      }}
      zoom={defaultZoom}
      onMessageReceived={(message) => {
        if (message.event === "onMapClicked") {
          console.log(message);
          const touchPos = message.payload?.touchLatLng;
          onPressPosition && onPressPosition([touchPos.lat, touchPos.lng]);
          putMarkerOnPress && setSelectedPos([touchPos.lat, touchPos.lng]);
        }
      }}
    />
  );
}
