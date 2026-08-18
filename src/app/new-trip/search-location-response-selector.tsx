import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ExpoIcon from "../../components/common/icons/ExpoIcon";
import Divider from "../../components/common/text/Divider";
import { colors } from "../../constants/style/colors";

interface SearchLocationResponseItem {
  lat: number;
  lon: number;
  displayName: string;
}

export default function SearchLocationResponseSelectorPage() {
  const {
    items: paramItems,
    selectedItemKey,
    ...params
  } = useLocalSearchParams<{
    items: string;
    selectedItemKey: string;
  }>();

  const items = useMemo(
    () => JSON.parse(paramItems) as SearchLocationResponseItem[],
    [paramItems],
  );

  const handlePressingItem = (item: SearchLocationResponseItem) => {
    console.log("params dans search", params);
    router.dismissTo({
      pathname: "/new-trip/location-selector",
      params: { ...params, [selectedItemKey]: JSON.stringify(item) },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        paddingHorizontal: 20,
        width: "100%",
        paddingVertical: 100,
      }}
    >
      <View
        style={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray[200],
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "100%",
        }}
      >
        <ScrollView>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: "100%",
                gap: 10,
                paddingTop: 10,
              }}
              onPress={() => handlePressingItem(item)}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 10,
                }}
              >
                <Text style={{ flex: 1 }}>{item.displayName}</Text>
                <ExpoIcon name="chevron-right" size={23}></ExpoIcon>
              </View>
              {index < items.length - 1 && <Divider style={{}}></Divider>}
            </TouchableOpacity>
          ))}
          <View style={{ height: 10 }}></View>
        </ScrollView>
      </View>
    </View>
  );
}
