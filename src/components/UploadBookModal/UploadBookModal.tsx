import BaseModal from "../GenericModal/BaseModal";
import UniversalInput from "../UniversalInput/UniversalInput";
import Styles from "./UploadBookModal.module.scss";
import { UploadBookModalProps } from "./UploadBookModal.types";
import Chip from "../Chip";
import { useState } from "react";
import { BookPayload } from "@/types/Books.types";
import { rgbaOpacity } from "@/utils/rgbaOpacity";
import { useCreateBook } from "@/queries/Books.queries";
import { useGetAllCategories } from "@/queries/Categories.queries";

const UploadBookModal = ({ onClose }: UploadBookModalProps) => {
  const { mutate: createBookMutate, isPending: isPendingCreate } =
    useCreateBook();
  const { data: allCategoriesData, isLoading: isLoadingcategoryIds } =
    useGetAllCategories();

  const [bookForm, setBookForm] = useState<BookPayload>({
    author: "",
    name: "",
    publisher: "",
    publishedIn: "",
    categoryIds: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev!,
      [name]: value || "",
    }));
  };

  const handleCategoryChange = (categoryId: number) => {
    const updatedcategoryIds = bookForm?.categoryIds
      ? bookForm.categoryIds.includes(categoryId)
        ? bookForm.categoryIds.filter((id) => id !== categoryId)
        : [...(bookForm.categoryIds || []), categoryId]
      : [categoryId];

    setBookForm({
      ...bookForm!,
      categoryIds: updatedcategoryIds,
    });
  };

  const isValidForm =
    bookForm &&
    Object.values(bookForm || {}).every(
      (value) => value !== null && value !== undefined && value !== ""
    ) &&
    bookForm.categoryIds.length > 0;

  const handleConfirm = () => {
    if (!isValidForm) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    createBookMutate(bookForm, {
      onSuccess: () => {
        alert("Livro criado com sucesso!");
        onClose();
      },
      onError: (error) => {
        console.error("Error creating book:", error);
      },
    });
  };

  const isLoading = isPendingCreate || isLoadingcategoryIds;
  const hascategoryIds = allCategoriesData && allCategoriesData.length > 0;

  return (
    <BaseModal
      onClose={onClose}
      title="Enviar livro"
      onConfirm={handleConfirm}
      disableConfirm={!isValidForm || isLoading}
      confirmLabel="Confimar upload"
      isLoadingConfirm={isLoading}
      confirmWidth={120}
    >
      <div className={Styles.Upload}>
        <h3 className={Styles.Upload_Title}>📚 Registre um novo livro</h3>
        <div className={Styles.UploadContent}>
          <div className={Styles.UploadRow}>
            <UniversalInput
              label="Título do livro"
              placeholder="Ex: O Senhor dos Anéis"
              required
              onChange={handleInputChange}
              type="text"
              value={bookForm?.name || ""}
              name="name"
            />
            <UniversalInput
              label="Editora"
              placeholder="Ex: HarperCollins"
              required
              onChange={handleInputChange}
              type="text"
              value={bookForm?.publisher || ""}
              name="publisher"
            />
          </div>
          <div className={Styles.UploadRow}>
            <UniversalInput
              label="Autor"
              placeholder="Ex: J.R.R. Tolkien"
              required
              onChange={handleInputChange}
              type="text"
              value={bookForm?.author || ""}
              name="author"
            />
            <UniversalInput
              label="Ano de publicação"
              placeholder="Ex: 1954"
              required
              onChange={handleInputChange}
              type="text"
              value={bookForm?.publishedIn || ""}
              name="publishedIn"
            />
          </div>
        </div>

        <div className={Styles.Divider} />

        <div className={Styles.UploadSection}>
          <p className={Styles.UploadSection_Title}>
            Selecione pelo menos 1 categoria:
          </p>

          <div className={Styles.categoryIds}>
            {hascategoryIds &&
              allCategoriesData?.map((category, index) => {
                const isSelected = bookForm?.categoryIds?.includes(
                  category.categoryId
                );

                return (
                  <Chip
                    key={index}
                    label={category.name}
                    mainColor={
                      isSelected ? rgbaOpacity("#5A62E6", 0.3) : "transparent"
                    }
                    sx={{
                      label: { color: isSelected ? "#5A62E6" : "#3e3e44" },
                      chip: {
                        border: `1px solid ${
                          isSelected ? "#5A62E6" : "#545470"
                        }`,
                        padding: "6px 8px",
                      },
                    }}
                    onClick={() => handleCategoryChange(category.categoryId)}
                  />
                );
              })}
            {!hascategoryIds && (
              <div className={Styles.categoryIdsEmpty}>
                <p className={Styles.categoryIdsEmpty__Label}>
                  Nenhuma categoria cadastrada. <br />
                  Cadastre uma categoria antes de enviar um livro.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default UploadBookModal;
