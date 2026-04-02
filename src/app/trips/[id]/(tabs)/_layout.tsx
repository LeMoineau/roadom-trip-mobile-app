import { Tabs } from "expo-router";
import ExpoIcon from "../../../../components/common/icons/ExpoIcon";
import { colors } from "../../../../constants/style/colors";

export default function TripPageLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarPosition: "bottom",
        tabBarStyle: { height: 20 },
        // tabBarIconStyle: { display: "none" },
        sceneStyle: { backgroundColor: colors.white },
        animation: "shift",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <ExpoIcon
              name={focused ? "home" : "home-outline"}
              size={20}
              style={{ color }}
            ></ExpoIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused, color }) => (
            <ExpoIcon
              name={focused ? "map" : "map-o"}
              size={20}
              style={{ color }}
            ></ExpoIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <ExpoIcon
              name={focused ? "settings" : "settings-outline"}
              size={20}
              style={{ color }}
            ></ExpoIcon>
          ),
        }}
      />
    </Tabs>
  );
}
