import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import NoTripYetItem from "../items/NoTripYetItem";

export default function LoadingPage({
  timeoutDuration = 2000,
  children,
}: {
  timeoutDuration?: number;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 30 }}
        ></ActivityIndicator>
      ) : (
        (children ?? <NoTripYetItem></NoTripYetItem>)
      )}
    </View>
  );
}
