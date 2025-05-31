import { useGetAllUsers } from "@/queries/Users.queries";
import Styles from "./ListUsersModal.module.scss";
import { ListUsersModalProps } from "./ListUsersModal.types";
import BaseModal from "../GenericModal/BaseModal";
import UserProfile from "../Navbar/UserProfile";

const ListUsersModal = ({ onClose }: ListUsersModalProps) => {
  const { data: allUsersData } = useGetAllUsers();

  return (
    <BaseModal
      onClose={onClose}
      title="Lista de Usuários"
      headerIcon="community"
      confirmLabel="Fechar"
      onConfirm={onClose}
    >
      <div className={Styles.Modal}>
        <div className={Styles.ModalHeader}>
          <h3 className={Styles.ModalHeader_Title}>
            Visualize todos os usuários cadastrados no sistema. <br />
          </h3>
        </div>

        <div className={Styles.ModalContent}>
          {allUsersData && allUsersData.length > 0 ? (
            allUsersData?.map((user, key) => (
              <UserProfile
                name={user.name}
                key={key}
                sx={{ background: "#f6f6f9", borderRadius: 4, height: 40, padding: "0 12px" }}
                sxAvatar={{ width: 24, height: 24 }}
              />
            ))
          ) : (
            <p className={Styles.EmptyMessage}>Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default ListUsersModal;
