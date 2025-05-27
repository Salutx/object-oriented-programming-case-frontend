import { IconName } from "@/components/Icon/Icon.types";

export interface NavbarItemProps {
  label: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
}
