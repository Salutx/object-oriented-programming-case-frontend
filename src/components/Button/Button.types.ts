import { IconName } from "../Icon/Icon.types";

export interface ButtonProps {
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
  leftIcon?: IconName;
  rightIcon?: IconName;
  sx?: React.CSSProperties;
  sxLabel?: React.CSSProperties;
  isLoading?: boolean;
}
