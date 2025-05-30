import Styles from "./GenericModal.module.scss";

import Button from "../Button/Button";
import Icon from "../Icon";
import { BaseModalProps } from "./GenericModal.types";

const BaseModal = ({
  onClose,
  title,
  children,
  disableConfirm,
  onConfirm,
  confirmLabel = "Confirmar",
  headerIcon = "upload",
  isLoadingConfirm = false,
  confirmWidth = "fit-content",
}: BaseModalProps) => {
  return (
    <div className={Styles.Modal}>
      <div className={Styles.ModalHeader}>
        <div className={Styles.ModalHeader__Side}>
          <Icon name={headerIcon} size={20} />
          <p className={Styles.ModalHeader_Title}>{title}</p>
        </div>

        <button className={Styles.ModalHeader__Close} onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>

      <div className={Styles.ModalContent}>{children}</div>

      <div className={Styles.ModalFooter}>
        <Button
          label={confirmLabel}
          onClick={onConfirm}
          rightIcon="checkmark"
          sx={{
            background: "#5A62E6",
            borderRadius: "8px",
            padding: "0 18px 0 20px",
            outline: "3px solid #adafdd",
            width: confirmWidth,
          }}
          sxLabel={{ color: "#FFFFFF" }}
          disabled={disableConfirm}
          isLoading={isLoadingConfirm}
        />
      </div>
    </div>
  );
};

export default BaseModal;
