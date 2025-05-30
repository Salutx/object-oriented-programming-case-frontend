import Styles from "./UploadCategoryModal.module.scss";

import BaseModal from "../GenericModal/BaseModal";
import { UploadCategoryModalProps } from "./UploadCategoryModal.types";
import UniversalInput from "../UniversalInput/UniversalInput";
import {
  useCreateCategory,
  useDeleteCategory,
  useGetAllCategories,
} from "@/queries/Categories.queries";
import Chip from "../Chip";
import { useState } from "react";

const UploadCategoryModal = ({ onClose }: UploadCategoryModalProps) => {
  const { mutate: createCategoryMutate, isPending: isPendingCreate } =
    useCreateCategory();
  const { mutate: deleteCategoryMutate, isPending: isPendingDelete } =
    useDeleteCategory();

  const { data: allCategoriesData } = useGetAllCategories();
  const [categoryName, setCategoryName] = useState<string>("");

  const hasCategories = allCategoriesData && allCategoriesData.length > 0;

  const alreadyHasCategory = allCategoriesData?.some(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase()
  );

  const handleChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleConfirm = () => {
    if (categoryName.trim() === "") return;
    createCategoryMutate(
      { name: categoryName.trim() },
      {
        onSuccess: () => {
          setCategoryName("");
          alert("Categoria cadastrada com sucesso!");
        },
      }
    );
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (!categoryId) return;

    const confirmDelete = confirm(
      "Tem certeza que deseja excluir esta categoria?"
    );
    if (!confirmDelete) return;

    deleteCategoryMutate(categoryId, {
      onSuccess: () => {
        alert("Categoria excluída com sucesso!");
      },
      onError: () => {
        alert("Erro ao excluir categoria! Tente novamente.");
      },
    });
  };

  const isLoading = isPendingCreate || isPendingDelete;

  return (
    <BaseModal
      onClose={onClose}
      title="Cadastrar categoria"
      onConfirm={handleConfirm}
      disableConfirm={
        alreadyHasCategory || categoryName.trim() === "" || isLoading
      }
      confirmLabel="Confimar cadastro"
      headerIcon="category"
      isLoadingConfirm={isLoading}
      confirmWidth={130}
    >
      <div className={Styles.Upload}>
        <h3 className={Styles.Upload_Title}>Registre uma nova categoria</h3>
        <div className={Styles.UploadContent}>
          <div className={Styles.UploadRow}>
            <UniversalInput
              required
              label="Título da categoria"
              placeholder="Ex: Ficção Científica"
              onChange={handleChangeCategoryName}
              type="text"
              value={categoryName}
              name="title"
              sx={{ width: "100%" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
            />
          </div>
        </div>

        <div className={Styles.UploadSection}>
          <p className={Styles.UploadSection_Title}>Listagem das categorias:</p>

          <div className={Styles.Categories}>
            {hasCategories &&
              allCategoriesData?.map((category, index) => (
                <Chip
                  key={index}
                  label={category.name}
                  mainColor="transparent"
                  sx={{
                    label: { color: "#3e3e44" },
                    chip: {
                      border: "1px solid #545470",
                      padding: "6px 10px 6px 12px",
                    },
                  }}
                  hasDelete
                  onDeleteChip={() => handleDeleteCategory(category.categoryId)}
                />
              ))}
            {!hasCategories && (
              <div className={Styles.CategoriesEmpty}>
                <p className={Styles.CategoriesEmpty__Label}>
                  Nenhuma categoria cadastrada.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default UploadCategoryModal;
