import {
  useDeleteCategory,
  useGetAllCategories,
} from "@/queries/Categories.queries";
import BaseModal from "../GenericModal/BaseModal";
import Icon from "../Icon";
import Styles from "./ListCategoriesModal.module.scss";
import { ListCategoriesModalProps } from "./ListCategoriesModal.types";
import { generateColorFromName } from "@/utils/generateColorFromName";
import { rgbaOpacity } from "@/utils/rgbaOpacity";
import React from "react";
import GenericModal from "../GenericModal/GenericModal";
import Button from "../Button/Button";
import UploadCategoryModal from "../UploadCategoryModal/UploadCategoryModal";

const ListCategoriesModal = ({ onClose }: ListCategoriesModalProps) => {
  const { data: allCategoriesData } = useGetAllCategories();
  const { mutate: deleteCategoryMutate } = useDeleteCategory();

  const handleDeleteCategory = (categoryId: number) => {
    if (confirm("Tem certeza que deseja remover esta categoria?")) {
      deleteCategoryMutate(categoryId, {
        onSuccess: () => {
          alert("Categoria removida com sucesso!");
        },
        onError: () => {
          alert("Erro ao remover a categoria. Tente novamente.");
        },
      });
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      title="Lista de Categorias"
      headerIcon="category"
      confirmLabel="Fechar"
      onConfirm={onClose}
    >
      <div className={Styles.ListCategories}>
        <h3 className={Styles.ListCategories_Title}>
          Visualize as categorias disponíveis no catálogo. <br />
          Edite, adicione ou remova categorias conforme necessário.
        </h3>

        <div className={Styles.ListCategoriesContent}>
          {allCategoriesData && allCategoriesData.length > 0 ? (
            allCategoriesData.map((category) => (
              <div
                className={Styles.CategorieItem}
                style={{
                  background: rgbaOpacity(
                    generateColorFromName(category.name),
                    0.1
                  ),
                }}
                key={category.categoryId}
              >
                <div className={Styles.CategorieItem__Side}>
                  <div
                    className={Styles.CategorieItem__Marker}
                    style={{
                      background: generateColorFromName(category.name),
                    }}
                  />
                  <p className={Styles.CategorieItem_Label}>{category.name}</p>
                </div>

                <div className={Styles.CategorieItem__Actions}>
                  <button
                    className={Styles.CategorieItem__Action}
                    onClick={() => handleDeleteCategory(category.categoryId)}
                  >
                    <Icon name="trash-can" />
                  </button>

                  <GenericModal
                    RenderController={({ onClick }) => (
                      <button
                        className={Styles.CategorieItem__Action}
                        onClick={onClick}
                      >
                        <Icon name="edit" />
                      </button>
                    )}
                  >
                    {({ onClose: onCloseEditCategory }) => (
                      <UploadCategoryModal
                        onClose={onCloseEditCategory}
                        initialCategoryId={category.categoryId}
                      />
                    )}
                  </GenericModal>
                </div>
              </div>
            ))
          ) : (
            <div className={Styles.CategoriesEmpty}>
              <p className={Styles.ListCategoriesEmpty}>
                Nenhuma categoria encontrada.
              </p>
              <GenericModal
                RenderController={({ onClick }) => (
                  <Button
                    label="Criar categoria"
                    onClick={onClick}
                    leftIcon="add"
                  />
                )}
              >
                {({ onClose: onCloseCreateCategory }) => (
                  <UploadCategoryModal onClose={onCloseCreateCategory} />
                )}
              </GenericModal>
            </div>
          )}
          {allCategoriesData && allCategoriesData.length > 0 && (
            <GenericModal
              RenderController={({ onClick }) => (
                <Button
                  label="Criar categoria"
                  onClick={onClick}
                  leftIcon="add"
                />
              )}
            >
              {({ onClose }) => <UploadCategoryModal onClose={onClose} />}
            </GenericModal>
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default ListCategoriesModal;
