import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import NoStepFound from "../../../../components/common/items/NoStepFound";
import DescriptionSection from "../../../../components/common/misc/DescriptionSection";
import Divider from "../../../../components/common/misc/Divider";
import StepMatcher from "../../../../components/features/step/StepMatcher";
import { Step } from "../../../../models/features/step.model";
import { DateUtils } from "../../../../shared/utils/date.utils";
import { useTripStore } from "../../../../stores/features/trip/trip.store";

export default function TripPage() {
  const trip = useTripStore((state) => state.trip);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const [step, setStep] = useState<Step>();

  const { index } = useLocalSearchParams<{ index: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (!!trip && !!index && trip.steps.length > parseInt(index)) {
      const _step = trip.steps[parseInt(index)];
      setStep(_step);
      navigation.setOptions({ headerTitle: _step.name });
    }
  }, [index]);

  if (!!!step) {
    return (
      <View style={{ padding: 20, paddingTop: 0 }}>
        <NoStepFound></NoStepFound>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
          <DescriptionSection
            items={[
              {
                label: "Type",
                value: step.stepType,
                color:
                  step.stepType === "Indice"
                    ? "blue"
                    : step.stepType === "Challenge"
                      ? "yellow"
                      : undefined,
              },
              {
                label: "Date de disponibilité",
                value: DateUtils.toHHmmDDMMYY(new Date(step.availableAt)),
              },
            ]}
          ></DescriptionSection>
          <Divider style={{ marginBottom: 0 }}></Divider>
          <Text style={{ fontWeight: "600", fontSize: 20 }}>{step.name}</Text>
          <StepMatcher step={step}></StepMatcher>
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
}
