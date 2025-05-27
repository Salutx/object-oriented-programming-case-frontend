export type IconName =
  | "catalog"
  | "category"
  | "community"
  | "external-link"
  | "file"
  | "globe"
  | "heart"
  | "heart-filled"
  | "library"
  | "next"
  | "trash-can"
  | "vercel"
  | "window";

export interface IconProps {
  name: IconName;
  size?: number;
}
