import { rgbaOpacity } from "@/utils/rgbaOpacity";
import Styles from "./Chip.module.scss";
import { ChipProps } from "./Chip.types";

const Chip = ({
  sx,
  label,
  mainColor = "#5A62E6",
  bgOpacity = 0.1,
}: ChipProps) => {
  return (
    <div
      className={Styles.Chip}
      style={{ background: rgbaOpacity(mainColor, bgOpacity), ...sx?.chip }}
    >
      <p
        className={Styles.Chip_Label}
        style={{ color: mainColor, ...sx?.label }}
      >
        {label}
      </p>
    </div>
  );
};

export default Chip;
