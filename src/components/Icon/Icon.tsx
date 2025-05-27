import Image from "next/image";
import { IconProps } from "./Icon.types";

const Icon = ({ name, size = 16 }: IconProps) => {
  return (
    <Image
      src={`/public/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className="icon"
      loading="lazy"
      draggable={false}
      unoptimized={true}
    />
  );
};

export default Icon;
