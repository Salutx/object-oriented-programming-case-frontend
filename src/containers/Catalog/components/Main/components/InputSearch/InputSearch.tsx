"use client";

import Icon from "@/components/Icon";
import Styles from "./InputSearch.module.scss";
import { InputSearchProps } from "./InputSearch.types";

const InputSearch = ({
  value,
  onChange,
  disabled,
  placeholder = "Pesquisar por...",
  width = 370,
}: InputSearchProps) => {
  return (
    <div className={Styles.InputSearch} style={{ width }}>
      <input
        className={Styles.InputSearch__Input}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      <Icon name="search" />
    </div>
  );
};

export default InputSearch;
