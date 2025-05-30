/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, memo } from "react";
import { Dialog } from "@mui/material";
import Styles from "./GenericModal.module.scss";
import useOverlayHook from "@/hooks/useOverlayHook";
import { GenericModalProps } from "./GenericModal.types";

const GenericModal = ({
  open,
  RenderController,
  onDismiss,
  children,
  RenderChildren,
  dialogProps,
}: GenericModalProps) => {
  const { isOpen, setIsOpen, onClick } = useOverlayHook();

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleDismiss = () => {
    onDismiss?.();
    setIsOpen(false);
  };

  const content = RenderChildren
    ? RenderChildren({ onClose: handleDismiss })
    : children && children({ onClose: handleDismiss });

  return (
    <React.Fragment>
      {RenderController && <RenderController onClick={onClick} />}
      <Dialog
        classes={{ root: Styles.OverlayBase }}
        slotProps={{ backdrop: { className: Styles.OverlayBackdrop } }}
        onClose={handleDismiss}
        open={isOpen}
        {...dialogProps}
      >
        {content}
      </Dialog>
    </React.Fragment>
  );
};

export default memo(GenericModal);
