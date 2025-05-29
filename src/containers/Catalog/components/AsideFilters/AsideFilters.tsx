import Styles from "./AsideFilters.module.scss";
import Chip from "@/components/Chip";
import CategoryOption from "./components/CategoryOption/CategoryOption";
import {
  useCreateCategory,
  useGetAllCategories,
} from "@/queries/Categories.queries";
import getCounterFromArray from "@/utils/getCounterFromArray";
import Icon from "@/components/Icon";
import useCatalogContext from "@/hooks/useCatalogContext";
import { useGetAllBooks } from "@/queries/Books.queries";

const AsideFilters = () => {
  const { filteredCategories, handleFilterCategory, handleResetFilters } =
    useCatalogContext();
  const { data: booksData } = useGetAllBooks();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetAllCategories();
  const { mutate, isPending: isPendingCategoryMutate } = useCreateCategory();

  const categoriesCounter = getCounterFromArray(categoriesData);

  const handleCreateCategory = () => {
    // mutate({});
  };

  const isLoading = isLoadingCategories || isPendingCategoryMutate;

  return (
    <aside className={Styles.AsideFilters}>
      <div className={Styles.AsideFilters_Header}>
        <h2 className={Styles.AsideFilters__Header_Label}>FILTRAR POR</h2>
      </div>

      <div className={Styles.AsideSection}>
        <div className={Styles.AsideSection__Header}>
          <h3 className={Styles.AsideSection__Header_Label}>Categorias</h3>
          <Chip label={categoriesCounter} />
        </div>

        <div className={Styles.AsideSection__Content}>
          {!isLoading &&
            categoriesData &&
            categoriesData?.length > 0 &&
            categoriesData?.map((category, index) => {
              const isSelected = filteredCategories.includes(
                category.categoryId
              );

              const booksAmount = booksData?.filter((book) =>
                book.categories?.find(
                  (cat) => cat.categoryId === category.categoryId
                )
              ).length;

              return (
                <CategoryOption
                  key={index}
                  isSelected={isSelected}
                  label={category?.name}
                  onClick={() => handleFilterCategory(category.categoryId)}
                  quantity={booksAmount}
                />
              );
            })}

          {((!isLoading && !categoriesData) ||
            categoriesData?.length === 0) && (
            <button className={Styles.AddCategory}>
              <Icon name="add" />
              <p className={Styles.AddCategory_Label}>Criar categoria</p>
            </button>
          )}
        </div>
        {/* <div className={Styles.AsideDivider} style={{ margin: "16px 0" }} /> */}
      </div>

      {filteredCategories && filteredCategories?.length >= 1 && (
        <button
          className={Styles.AsideResetFilters}
          onClick={handleResetFilters}
        >
          <p className={Styles.AsideResetFilters_Label}>Limpar Filtros</p>
          <div className={Styles.AsideResetFilters__Icon}>
            <Icon name="trash-can" />
          </div>
        </button>
      )}
    </aside>
  );
};

export default AsideFilters;
