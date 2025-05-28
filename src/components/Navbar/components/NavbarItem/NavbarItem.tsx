'use client'

import Icon from "@/components/Icon";
import Styles from "./NavbarItem.module.scss";
import { NavbarItemProps } from "./NavbarItem.types";
import clsx from "clsx";

const NavbarItem = ({
  label,
  onClick,
  disabled,
  isActive,
  leftIcon,
  rightIcon,
}: NavbarItemProps) => {
  return (
    <button
      className={clsx(Styles.NavbarItem, isActive && Styles.NavbarItem_Active)}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && <Icon name={leftIcon} size={16} />}
      <p className={Styles.NavbarItem_Label}>{label}</p>
      {rightIcon && <Icon name={rightIcon} size={16} />}
    </button>
  );
};

export default NavbarItem;
