"use client";

import Icon from "../Icon";
import FavoriteButton from "./components/FavoriteButton";
import NavbarItem from "./components/NavbarItem";
import Styles from "./Navbar.module.scss";

const Navbar = () => {
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
        <NavbarItem
          label="Categorias"
          onClick={() => {}}
          leftIcon="category"
          rightIcon="external-link"
        />
        <NavbarItem
          label="Comunidade"
          onClick={() => {}}
          leftIcon="community"
          rightIcon="external-link"
        />
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
        <FavoriteButton onClick={() => {}} quantity={5} />
      </div>
    </nav>
  );
};

export default Navbar;
