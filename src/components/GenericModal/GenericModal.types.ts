import { DialogProps } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export interface GenericModalProps {
  open?: boolean;
  RenderController?: ({ onClick }: { onClick: () => void }) => ReactElement;
  onDismiss?: () => void;
  children?: ({ onClose }: { onClose: () => void }) => ReactNode;
  RenderChildren?: ({ onClose }: { onClose: () => void }) => ReactNode;
  dialogProps?: Partial<DialogProps>;
}
