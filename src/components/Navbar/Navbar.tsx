import NavbarItem from "./components/NavbarItem";
import Styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={Styles.Navbar}>
      <div className={Styles.NavbarSection}>
        <NavbarItem label="Catálogo" onClick={() => {}} leftIcon="catalog" />
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
      <div className={Styles.NavbarSection}></div>
      <div className={Styles.NavbarSection}></div>
    </nav>
  );
};

export default Navbar;
