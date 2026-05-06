import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export default function useImagePicker() {
  const [images, setImages] = useState<string[]>([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((a) => a.uri)]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need camera access to take a photo.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Allows cropping
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map((a) => a.uri)]);
    }
  };

  const removeImage = (uri: string) => {
    const index = images.findIndex((u) => u === uri);
    if (index !== -1) {
      const tmp = [...images];
      tmp.splice(index, 1);
      setImages(tmp);
    }
  };

  return { images, setImages, pickImages, removeImage, takePhoto };
}
