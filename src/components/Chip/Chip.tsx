import { rgbaOpacity } from "@/utils/rgbaOpacity";
import Styles from "./Chip.module.scss";
import { ChipProps } from "./Chip.types";
import Icon from "../Icon";

const Chip = ({
  sx,
  label,
  mainColor = "#5A62E6",
  bgOpacity = 0.1,
  onClick,
  hasDelete,
  onDeleteChip,
}: ChipProps) => {
  return (
    <div
      className={Styles.Chip}
      style={{
        background: rgbaOpacity(mainColor, bgOpacity),
        cursor: onClick ? "pointer" : "default",
        ...sx?.chip,
      }}
      onClick={onClick}
    >
      <p
        className={Styles.Chip_Label}
        style={{ color: mainColor, ...sx?.label }}
      >
        {label}
      </p>
      {hasDelete && (
        <button
          className={Styles.Chip_Delete}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteChip?.();
          }}
        >
          <Icon name="trash-can" />
        </button>
      )}
    </div>
  );
};

export default Chip;
