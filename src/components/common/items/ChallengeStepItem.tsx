import { Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { ChallengeDto } from "../../../shared/types/dto/challenges/Challenge.dto";
import OutlineButton from "../buttons/OutlineButton";
import ExpoIcon from "../icons/ExpoIcon";
import Divider from "../misc/Divider";
import TagItem from "./TagItem";

export default function ChallengeStepItem({
  step,
  children,
}: {
  step: ChallengeDto;
  children?: React.ReactNode;
}) {
  //TODO: update tags nb of use et recompenses
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <TagItem
            text={`${step.nbOfUses} Utilisation`}
            bgColor={colors.amber[400]}
          ></TagItem>
          <TagItem
            text={`Récompense :`}
            bgColor={colors.green[500]}
            iconName="person"
          ></TagItem>
        </View>
        <Text style={{ fontSize: 17 }}>{step.message}</Text>
        {step.minPhotos !== undefined && (
          <Text style={{ fontSize: 12 }}>
            nombre de photos minimum: {step.minPhotos}
          </Text>
        )}
        {children}
      </View>
      <Divider style={{ width: "100%", marginVertical: 20 }}></Divider>
      <OutlineButton
        content="Prendre une photo"
        prependIcon={<ExpoIcon name="camera" size={23}></ExpoIcon>}
      ></OutlineButton>
      <OutlineButton
        content="Ajouter une photo"
        prependIcon={<ExpoIcon name="picture-o" size={20}></ExpoIcon>}
      ></OutlineButton>
    </View>
  );
}
