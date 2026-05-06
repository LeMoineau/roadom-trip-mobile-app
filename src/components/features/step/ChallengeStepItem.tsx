import { useContext, useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { colors } from "../../../constants/style/colors";
import { ToastContext } from "../../../contexts/contexts";
import useFileSystem from "../../../hooks/common/use-file-system";
import useImagePicker from "../../../hooks/common/use-image-picker";
import useTripRepository from "../../../hooks/features/trip/useTripRepository";
import { Challenge } from "../../../models/features/challenge.model";
import OutlineButton from "../../common/buttons/OutlineButton";
import ExpoIcon from "../../common/icons/ExpoIcon";
import StepImage from "./StepImage";

export default function ChallengeStepItem({
  challenge,
  children,
}: {
  challenge: Challenge;
  children?: React.ReactNode;
}) {
  const { images, setImages, pickImages, takePhoto, removeImage } =
    useImagePicker();
  const { fileExist, saveFileLocally, deleteFile, listFiles } = useFileSystem();
  const { updateTrip } = useTripRepository({});
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const images = listFiles(`/steps/${challenge.id}/images/`);
    setImages(images);
  }, []);

  useEffect(() => {
    for (let uri of images) {
      const imageName = uri.split("/").pop();
      if (!fileExist(`/steps/${challenge.id}/images/${imageName}`)) {
        saveFileLocally({
          currentUri: uri,
          destinationUri: `/steps/${challenge.id}/images/`,
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
            deleteFile(`/steps/${challenge.id}/images/${imageName}`);
            removeImage(uri);
          },
        },
      ],
    );
  };

  const handleEarnChallengeReward = () => {
    Alert.alert(
      "Récupérer la récompense",
      "Etes-vous sûr de d'avoir bien complété le challenge ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            challenge.earnReward();
            updateTrip(challenge.trip);
            showToast({
              message: challenge.earningRewardMessage,
              bgColor: colors.green[500],
              duration: 3000,
            });
          },
        },
      ],
    );
  };

  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 17 }}>{challenge.message}</Text>
        {challenge.minPhotos !== undefined && (
          <Text style={{ fontSize: 12 }}>
            nombre de photos minimum: {challenge.minPhotos}
          </Text>
        )}
        {children}
      </View>
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
        onPress={takePhoto}
      ></OutlineButton>
      <OutlineButton
        content="Ajouter une photo"
        prependIcon={<ExpoIcon name="picture-o" size={20}></ExpoIcon>}
        onPress={pickImages}
      ></OutlineButton>
      {!!!challenge.used && (
        <OutlineButton
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.blue[400],
          }}
          textStyle={{ color: colors.white }}
          content="Récupérer la récompense"
          prependIcon={
            <ExpoIcon
              name="done"
              size={20}
              style={{ color: colors.white }}
            ></ExpoIcon>
          }
          onPress={handleEarnChallengeReward}
          activeOpacity={0.8}
        ></OutlineButton>
      )}
    </View>
  );
}
