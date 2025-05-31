import Styles from "./UploadCategoryModal.module.scss";

import BaseModal from "../GenericModal/BaseModal";
import { UploadCategoryModalProps } from "./UploadCategoryModal.types";
import UniversalInput from "../UniversalInput/UniversalInput";
import {
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
  useGetAllCategories,
} from "@/queries/Categories.queries";
import Chip from "../Chip";
import { useEffect, useState } from "react";

const UploadCategoryModal = ({
  onClose,
  initialCategoryId,
}: UploadCategoryModalProps) => {
  const { mutate: editCategoryMutate, isPending: isPendingEdit } =
    useEditCategory();
  const { mutate: createCategoryMutate, isPending: isPendingCreate } =
    useCreateCategory();
  const { mutate: deleteCategoryMutate, isPending: isPendingDelete } =
    useDeleteCategory();

  const { data: allCategoriesData } = useGetAllCategories();
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    if (initialCategoryId) {
      const initialCategory = allCategoriesData?.find(
        (category) => category.categoryId === initialCategoryId
      );

      if (initialCategory) {
        setCategoryName(initialCategory.name);
      }
    }
  }, [allCategoriesData, initialCategoryId]);

  const isEditing = Boolean(initialCategoryId);
  const hasCategories = allCategoriesData && allCategoriesData.length > 0;

  const alreadyHasCategory =
    !isEditing &&
    allCategoriesData?.some(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

  const isEqualToInitialCategory =
    isEditing && allCategoriesData
      ? allCategoriesData.some(
          (category) =>
            category.categoryId === initialCategoryId &&
            category.name.toLowerCase() === categoryName.toLowerCase()
        )
      : false;

  const handleChangeCategoryName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleConfirm = () => {
    if (categoryName.trim() === "") return;

    if (isEditing) {
      editCategoryMutate(
        { categoryId: initialCategoryId!, name: categoryName.trim() },
        {
          onSuccess: () => {
            setCategoryName("");
            alert("Categoria atualizada com sucesso!");
          },
          onError: (error) => {
            console.log("error", error);
            alert("Erro ao atualizar categoria! Tente novamente.");
          },
        }
      );

      return;
    }

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

  const isLoading = isPendingCreate || isPendingDelete || isPendingEdit;

  return (
    <BaseModal
      onClose={onClose}
      title={isEditing ? "Editar categoria" : "Cadastrar categoria"}
      onConfirm={handleConfirm}
      disableConfirm={
        alreadyHasCategory ||
        categoryName.trim() === "" ||
        isLoading ||
        isEqualToInitialCategory
      }
      confirmLabel={isEditing ? "Confirmar edição" : "Confimar cadastro"}
      headerIcon="category"
      isLoadingConfirm={isLoading}
      confirmWidth={130}
    >
      <div className={Styles.Upload}>
        <h3 className={Styles.Upload_Title}>
          {!isEditing ? "Registre uma nova categoria" : "Atualize a categoria"}
        </h3>
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
