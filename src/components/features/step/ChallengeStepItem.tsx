import { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import useFileSystem from "../../../hooks/common/use-file-system";
import useImagePicker from "../../../hooks/common/use-image-picker";
import { ChallengeDto } from "../../../shared/types/dto/challenges/Challenge.dto";
import OutlineButton from "../../common/buttons/OutlineButton";
import ExpoIcon from "../../common/icons/ExpoIcon";
import TagItem from "../../common/items/TagItem";
import Divider from "../../common/misc/Divider";
import StepImage from "./StepImage";

export default function ChallengeStepItem({
  step,
  children,
}: {
  step: ChallengeDto;
  children?: React.ReactNode;
}) {
  const { images, setImages, pickImages, takePhoto, removeImage } =
    useImagePicker();
  const { fileExist, saveFileLocally, deleteFile, listFiles } = useFileSystem();

  useEffect(() => {
    const images = listFiles(`/steps/${step.id}/images/`);
    setImages(images);
  }, []);

  useEffect(() => {
    for (let uri of images) {
      const imageName = uri.split("/").pop();
      if (!fileExist(`/steps/${step.id}/images/${imageName}`)) {
        saveFileLocally({
          currentUri: uri,
          destinationUri: `/steps/${step.id}/images/`,
        });
      }
    }
  }, [images]);

  const handleDeleteImage = (uri: string) => {
    Alert.alert(
      "Retirer cette image",
      "Etes-vous sûr de vouloir retirer cette image du challenge ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            const imageName = uri.split("/").pop();
            deleteFile(`/steps/${step.id}/images/${imageName}`);
            removeImage(uri);
          },
        },
      ],
    );
  };

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
            text={`${step.nbOfUses === "infinite" ? "" : step.nbOfUses + " "}Utilisation${step.nbOfUses === "infinite" ? " Infini" : ""}`}
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
      {images.map((uri, index) => (
        <StepImage
          uri={uri}
          key={index}
          onPressDelete={handleDeleteImage}
        ></StepImage>
      ))}
      <OutlineButton
        content="Prendre une photo"
        prependIcon={<ExpoIcon name="camera" size={23}></ExpoIcon>}
        onPress={() => {
          takePhoto();
        }}
      ></OutlineButton>
      <OutlineButton
        content="Ajouter une photo"
        prependIcon={<ExpoIcon name="picture-o" size={20}></ExpoIcon>}
        onPress={() => {
          pickImages();
        }}
      ></OutlineButton>
    </View>
  );
}
