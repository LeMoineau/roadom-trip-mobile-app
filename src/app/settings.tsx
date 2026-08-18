import { useContext } from "react";
import { Alert, View } from "react-native";
import OutlineButton from "../components/common/buttons/OutlineButton";
import ExpoIcon from "../components/common/icons/ExpoIcon";
import DividerTitle from "../components/common/text/DividerTitle";
import config from "../config/config";
import { storageKeys } from "../config/storage-keys";
import { colors } from "../constants/style/colors";
import { ToastContext } from "../contexts/contexts";
import useStorage from "../hooks/common/use-storage";

export default function SettingsPage() {
  const { removeItem } = useStorage();
  const { showToast } = useContext(ToastContext);

  const handleClearHistory = () => {
    Alert.alert(
      "Vider l'historique",
      "Vous allez supprimer les données des précédents road-trip de votre historique. Voulez-vous continuer ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            removeItem(storageKeys.ARCHIVED_TRIPS);
            showToast({
              message:
                "Les données d'historique sur votre appareil ont bien été supprimées",
              bgColor: colors.green[500],
              duration: 3000,
            });
          },
        },
      ],
    );
  };

  const handleClearStorage = () => {
    Alert.alert(
      "Vider le stockage",
      "Vous allez supprimer les données stockés sur votre appareil (historiques des précédents road-trip et road-trip actuel notamment). Voulez-vous continuer ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            removeItem(storageKeys.ARCHIVED_TRIPS);
            removeItem(storageKeys.CURRENT_TRIP);
            removeItem(storageKeys.NOTIFICATION_TEST);
            showToast({
              message: "Les données sur votre appareil ont bien été supprimées",
              bgColor: colors.green[500],
              duration: 3000,
            });
          },
        },
      ],
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        padding: 20,
      }}
    >
      <DividerTitle
        title="Compte"
        style={{ paddingTop: 20, paddingBottom: 0 }}
      ></DividerTitle>
      <OutlineButton
        prependIcon={<ExpoIcon name="google" size={20}></ExpoIcon>}
        content="Se connecter"
        onPress={handleClearHistory}
      ></OutlineButton>
      <DividerTitle
        title="Stockage"
        style={{ paddingTop: 20, paddingBottom: 0 }}
      ></DividerTitle>
      <OutlineButton
        prependIcon={<ExpoIcon name="history-toggle-off" size={20}></ExpoIcon>}
        content="Vider l'historique"
        onPress={handleClearHistory}
      ></OutlineButton>
      <OutlineButton
        prependIcon={<ExpoIcon name="trash" size={20}></ExpoIcon>}
        content="Vider le stockage"
        onPress={handleClearStorage}
      ></OutlineButton>
      <DividerTitle
        title={`test env var: ${config.getEnv().test}`}
        style={{ paddingTop: 20, paddingBottom: 0 }}
      ></DividerTitle>
    </View>
  );
}
