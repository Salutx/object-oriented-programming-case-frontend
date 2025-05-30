import React from "react";

export interface ChipProps {
  label: string | number;
  sx?: {
    chip?: React.CSSProperties;
    label?: React.CSSProperties;
  };
  mainColor?: string;
  bgOpacity?: number;
  onClick?: () => void;
  onDeleteChip?: () => void;
  hasDelete?: boolean;
}
