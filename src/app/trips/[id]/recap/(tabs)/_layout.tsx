import { Tabs, useLocalSearchParams } from "expo-router";
import ExpoIcon from "../../../../../components/common/icons/ExpoIcon";
import { colors } from "../../../../../constants/style/colors";

export default function TripPageLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarPosition: "bottom",
        tabBarStyle: { height: 40 },
        sceneStyle: { backgroundColor: colors.white },
        animation: "shift",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        initialParams={{
          id,
        }}
        options={{
          title: "Statistiques",
          tabBarIcon: ({ focused, color }) => (
            <ExpoIcon
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={20}
              style={{ color }}
            ></ExpoIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        initialParams={{
          id,
        }}
        options={{
          title: "Carte",
          tabBarIcon: ({ focused, color }) => (
            <ExpoIcon
              name={focused ? "map" : "map-o"}
              size={20}
              style={{ color }}
            ></ExpoIcon>
          ),
        }}
      />
    </Tabs>
  );
}
