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
  | "window"
  | "checkmark"
  | "search"
  | "add"
  | "eye"
  | "eye-off"

export interface IconProps {
  name: IconName;
  size?: number;
}
