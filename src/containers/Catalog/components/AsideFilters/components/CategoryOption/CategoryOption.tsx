import Checkbox from "@/components/Checkbox";
import Styles from "./CategoryOption.module.scss";
import { CategoryOptionProps } from "./CategoryOption.types";

const CategoryOption = ({
  label,
  onClick,
  quantity,
  isSelected,
}: CategoryOptionProps) => {
  return (
    <div className={Styles.CategoryOption} onClick={onClick}>
      <div className={Styles.CategoryOption__Side}>
        <Checkbox checked={isSelected} />
        <p className={Styles.CategoryOption_Label}>{label}</p>
      </div>

      {quantity && quantity > 0 && (
        <span className={Styles.CategoryOption_Quantity}>( {quantity} )</span>
      )}
    </div>
  );
};

export default CategoryOption;
