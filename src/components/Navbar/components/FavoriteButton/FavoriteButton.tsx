import Icon from "@/components/Icon";
import Styles from "./FavoriteButton.module.scss";
import { FavoriteButtonProps } from "./FavoriteButton.types";
import Chip from "@/components/Chip";

const FavoriteButton = ({
  sx,
  onClick,
  disabled,
  quantity = 0,
  label = "Seus favoritos",
  displayHeart = true,
}: FavoriteButtonProps) => {
  return (
    <button
      style={sx}
      onClick={onClick}
      disabled={disabled}
      className={Styles.FavoriteButton}
    >
      {displayHeart && <Icon name="heart" />}
      <p className={Styles.FavoriteButton_Label}>{label}</p>
      {quantity > 0 && <Chip label={quantity} mainColor="#F96389" />}
    </button>
  );
};

export default FavoriteButton;
