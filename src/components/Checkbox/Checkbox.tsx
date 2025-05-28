import clsx from "clsx";
import Styles from "./Checkbox.module.scss";
import { CheckBoxProps } from "./Checkbox.types";
import Icon from "../Icon";
import { rgbaOpacity } from "@/utils/rgbaOpacity";

const Checkbox = ({
  checked,
  disabled,
  mainColor = "#5A62E6",
  onClick,
}: CheckBoxProps) => {
  const customStyles = {
    "--checkbox-color": mainColor,
    "--checkbox-color-opacity": rgbaOpacity(mainColor, 0.8),
  } as React.CSSProperties;

  return (
    <button
      onClick={onClick}
      style={{ ...customStyles }}
      className={clsx(Styles.Checkmark, checked && Styles.Checkmark__Checked)}
      disabled={disabled}
    >
      {checked && <Icon name="checkmark" size={12} />}
    </button>
  );
};

export default Checkbox;
