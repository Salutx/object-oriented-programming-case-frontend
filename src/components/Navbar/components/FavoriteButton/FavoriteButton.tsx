import Icon from "@/components/Icon";
import Styles from "./FavoriteButton.module.scss";
import { FavoriteButtonProps } from "./FavoriteButton.types";
import Chip from "@/components/Chip";
import clsx from "clsx";

const FavoriteButton = ({
  sx,
  onClick,
  disabled,
  quantity = 0,
  label = "Seus favoritos",
  displayHeart = true,
  isSelected = false,
}: FavoriteButtonProps) => {
  return (
    <button
      style={sx}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        Styles.FavoriteButton,
        isSelected && Styles.FavoriteButton_Selected
      )}
    >
      {displayHeart && <Icon name="heart" />}
      <p className={Styles.FavoriteButton_Label}>{label}</p>
      {quantity > 0 && <Chip label={quantity} mainColor="#F96389" />}
    </button>
  );
};

export default FavoriteButton;
