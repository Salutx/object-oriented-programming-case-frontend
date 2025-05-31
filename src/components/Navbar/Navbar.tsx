"use client";

import { useFavoriteBookQuery } from "@/hooks/useFavoriteBook";
import GenericModal from "../GenericModal/GenericModal";
import Icon from "../Icon";
import ListCategoriesModal from "../ListCategoriesModal";
import ListUsersModal from "../ListUsersModal";
import FavoriteButton from "./components/FavoriteButton";
import NavbarItem from "./components/NavbarItem";
import Styles from "./Navbar.module.scss";
import UserProfile from "./UserProfile";
import useCatalogContext from "@/hooks/useCatalogContext";
import { UserSession } from "@/types/Users.types";
import { useUserSessionQuery } from "@/hooks/useUserSession";

const Navbar = () => {
  const { handleFilterFavorites, filteredByFavorites } = useCatalogContext();
  const { data: favoriteBooksData } = useFavoriteBookQuery();
  const favoriteBooksCounter =
    (favoriteBooksData && favoriteBooksData?.length) || 0;

  const { data: userSession } = useUserSessionQuery();

  const parsedUserSession = userSession
    ? (JSON.parse(userSession) as UserSession)
    : null;

  return (
    <nav className={Styles.Navbar}>
      <div
        className={Styles.NavbarSection}
        style={{ justifyContent: "flex-start" }}
      >
        <NavbarItem
          isActive
          label="Catálogo"
          onClick={() => {}}
          leftIcon="catalog"
        />

        <GenericModal
          RenderController={({ onClick }) => (
            <NavbarItem
              label="Categorias"
              onClick={onClick}
              leftIcon="category"
              rightIcon="external-link"
            />
          )}
        >
          {({ onClose }) => <ListCategoriesModal onClose={onClose} />}
        </GenericModal>

        <GenericModal
          RenderController={({ onClick }) => (
            <NavbarItem
              label="Comunidade"
              onClick={onClick}
              leftIcon="community"
              rightIcon="external-link"
            />
          )}
        >
          {({ onClose }) => <ListUsersModal onClose={onClose} />}
        </GenericModal>
      </div>
      <div
        className={Styles.NavbarSection}
        style={{
          justifyContent: "center",
          borderLeft: "1px solid #e6e5eb",
          borderRight: "1px solid #e6e5eb",
        }}
      >
        <div className={Styles.NavbarLogo}>
          <Icon name="library" />
          <div className={Styles.NavbarLogo_Brand}>
            <p className={Styles.NavbarLogo_Label}>LibraryDB</p>
            <p className={Styles.NavbarLogo_Copyright}>by Salutx</p>
          </div>
        </div>
      </div>
      <div
        className={Styles.NavbarSection}
        style={{ justifyContent: "flex-end" }}
      >
        <FavoriteButton
          onClick={handleFilterFavorites}
          quantity={favoriteBooksCounter}
          isSelected={filteredByFavorites}
          disabled={favoriteBooksCounter === 0}
        />
        <div className={Styles.Divider} />
        <UserProfile displaySignOut name={parsedUserSession?.name} />
      </div>
    </nav>
  );
};

export default Navbar;
