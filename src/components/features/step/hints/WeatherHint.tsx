import { Text, View } from "react-native";
import { WeatherHintDto } from "../../../../shared/types/dto/hints/WeatherHint.dto";

export default function WeatherHint({ step }: { step: WeatherHintDto }) {
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 17 }}>
          {step.weather.values.temperature} {step.weather.units.temperature}
        </Text>
        <Text style={{ fontSize: 17 }}>
          {step.weather.values.weatherIcon} {step.weather.values.weatherLibelle}
        </Text>
      </View>
    </View>
  );
}
