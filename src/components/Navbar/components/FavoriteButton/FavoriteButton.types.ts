export interface FavoriteButtonProps {
  onClick: () => void;
  disabled?: boolean;
  quantity?: number;
  label?: string;
  displayHeart?: boolean;
  sx?: React.CSSProperties;
  isSelected?: boolean;
}
