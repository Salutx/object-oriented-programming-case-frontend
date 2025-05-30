import Styles from "./Button.module.scss";

import Icon from "../Icon";
import { ButtonProps } from "./Button.types";
import { CircularProgress } from "@mui/material";

const Button = ({
  sx,
  disabled,
  label,
  onClick,
  leftIcon,
  rightIcon,
  sxLabel,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      className={Styles.Button}
      onClick={onClick}
      disabled={disabled}
      style={sx}
    >
      {!isLoading && leftIcon && <Icon name={leftIcon} size={16} />}
      {!isLoading && (
        <p className={Styles.Button_Label} style={sxLabel}>
          {label}
        </p>
      )}

      {isLoading && (
        <div className={Styles.Button__Loading}>
          <CircularProgress size={16} color="inherit" />
        </div>
      )}

      {!isLoading && rightIcon && <Icon name={rightIcon} size={16} />}
    </button>
  );
};

export default Button;
