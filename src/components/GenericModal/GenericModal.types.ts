import { DialogProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { IconName } from "../Icon/Icon.types";

export interface GenericModalProps {
  open?: boolean;
  RenderController?: ({ onClick }: { onClick: () => void }) => ReactElement;
  onDismiss?: () => void;
  children?: ({ onClose }: { onClose: () => void }) => ReactNode;
  RenderChildren?: ({ onClose }: { onClose: () => void }) => ReactNode;
  dialogProps?: Partial<DialogProps>;
}

export interface BaseModalProps {
  onClose: () => void;
  title: string;
  onConfirm?: () => void;
  disableConfirm?: boolean;
  confirmLabel?: string;
  children: ReactNode;
  headerIcon?: IconName;
  isLoadingConfirm?: boolean;
  confirmWidth?: "fit-content" | "full-width" | "auto" | number | "string";
}
