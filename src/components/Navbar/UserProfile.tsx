import { useSignOut } from "@/hooks/useUserSession";
import Styles from "./Navbar.module.scss";
import Icon from "../Icon";
import { generateColorFromName } from "@/utils/generateColorFromName";
import { rgbaOpacity } from "@/utils/rgbaOpacity";
import { UserProfileProps } from "./Navbar.types";

const UserProfile = ({ displaySignOut = false, name, sx, sxAvatar }: UserProfileProps) => {
  const { mutate: signOut } = useSignOut();


  const extractFirstLetters = (name?: string) => {
    if (!name) return "UN";
    const names = name?.split(" ");
    if (names.length === 0) return "";
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  };

  const extractedInitials = name
    ? extractFirstLetters(name || "")
    : "";

  return (
    <div className={Styles.UserProfile} style={sx}>
      <div
        className={Styles.UserAvatar}
        style={{
          background: rgbaOpacity(
            generateColorFromName(name),
            0.3
          ),
          ...sxAvatar,
        }}
      >
        <p className={Styles.UserAvatar_Label}>{extractedInitials}</p>
      </div>
      <p className={Styles.UserName}>{name}</p>

      {displaySignOut && (
        <button className={Styles.Exit} onClick={() => signOut()}>
          <Icon name="exit" />
        </button>
      )}
    </div>
  );
};

export default UserProfile;
