import Image from "next/image";
import EmptyFeeling from "../../../public/empty-feeling.png";

import Styles from "./EmptyException.module.scss";
import { EmptyExceptionProps } from "./EmptyException.types";

const EmptyException = ({ description, title }: EmptyExceptionProps) => {
  return (
    <div className={Styles.EmptyException}>
      <Image alt="Empty Feeling" src={EmptyFeeling} width={150} />
      <div className={Styles.EmptyException__Content}>
        <h1 className={Styles.EmptyException_Title}>{title}</h1>
        <p className={Styles.EmptyException_Description}>{description}</p>
      </div>
    </div>
  );
};

export default EmptyException;
