import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import NoStepFound from "../../../../components/common/items/NoStepFound";
import TagItem from "../../../../components/common/items/TagItem";
import DescriptionSection, {
  DescriptionSectionItem,
} from "../../../../components/common/misc/DescriptionSection";
import Divider from "../../../../components/common/misc/Divider";
import StepMatcher from "../../../../components/features/step/StepMatcher";
import { colors } from "../../../../constants/style/colors";
import useTripRepository from "../../../../hooks/features/trip/useTripRepository";
import { Challenge } from "../../../../models/features/challenge.model";
import { Step } from "../../../../models/features/step.model";
import { ArrayUtils } from "../../../../shared/utils/array.utils";
import { DateUtils } from "../../../../shared/utils/date.utils";

export default function TripPage() {
  const { id, index } = useLocalSearchParams<{ id: string; index: string }>();
  const { trip } = useTripRepository({ id });
  const [step, setStep] = useState<Step>();

  const navigation = useNavigation();

  useEffect(() => {
    if (!!trip && !!index && trip.steps.length > parseInt(index)) {
      const _step = trip.steps[parseInt(index)];
      setStep(_step);
      navigation.setOptions({ headerTitle: _step.name });
    }
  }, [trip, index]);

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
              ...ArrayUtils.itemOrVoid<DescriptionSectionItem>(
                step instanceof Challenge && [
                  {
                    label: "Nombre d'utilisation",
                    value: step.nbOfUsesLabel,
                    icon: step.nbOfUses === "infinite" ? "infinite" : undefined,
                    color: "violet",
                  },
                  {
                    label: "Récompense",
                    value: step.rewardLabel,
                    color: "blue",
                    icon: step.rewardIcon,
                  },
                ],
              ),
              ...ArrayUtils.itemOrVoid<DescriptionSectionItem>(
                step instanceof Challenge &&
                  !!step.finishDate && {
                    label: "Date de fin",
                    value: DateUtils.toHHmmDDMMYY(new Date(step.finishDate)),
                    color: "gray",
                  },
              ),
            ]}
          ></DescriptionSection>
          <Divider style={{ marginBottom: 0 }}></Divider>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 20 }}>{step.name}</Text>
            {step instanceof Challenge && !!step.used && (
              <TagItem
                text={`Terminé`}
                textColor={colors.green[500]}
                style={{ borderColor: colors.green[200], borderWidth: 1 }}
                bgColor={colors.green[100]}
                iconName="done"
              ></TagItem>
            )}
          </View>
          <StepMatcher step={step}></StepMatcher>
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
    </View>
  );
}
