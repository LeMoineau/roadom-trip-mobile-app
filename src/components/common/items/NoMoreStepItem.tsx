import { colors } from "../../../constants/style/colors";
import TripStatusItem from "./TripStatusItem";

export default function NoMoreStepItem() {
  return (
    <TripStatusItem
      bgColor={colors.blue[50]}
      borderColor={colors.blue[100]}
      textColor={colors.blue[500]}
      title="Plus de prochaine étape !"
      desc="Vous avez épuisé tous les indices et challenges disponibles ! Bon courage pour trouver votre destination !"
    ></TripStatusItem>
  );
}
