import { useState } from "react";
import Styles from "./UniversalInput.module.scss";
import { UniversalInputProps } from "./UniversalInput.types";
import Icon from "@/components/Icon";
import clsx from "clsx";

const UniversalInput = ({
  label,
  onChange,
  type,
  value,
  placeholder,
  name,
  required,
  onKeyDown,
  sx,
}: UniversalInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={Styles.LoginWrapper} style={sx}>
      <p className={Styles.LoginLabel}>
        {label}
        {required && <span className={Styles.LoginRequired}>*</span>}
      </p>
      <div className={Styles.LoginField}>
        <input
          className={Styles.LoginInput}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          required={required}
          onKeyDown={onKeyDown}
        />

        {type === "password" && (
          <button
            className={clsx(Styles.LoginShowPassword)}
            onClick={handleTogglePasswordVisibility}
          >
            <Icon name={showPassword ? "eye-off" : "eye"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UniversalInput;
