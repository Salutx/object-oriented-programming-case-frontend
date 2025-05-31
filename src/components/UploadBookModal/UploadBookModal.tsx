import BaseModal from "../GenericModal/BaseModal";
import UniversalInput from "../UniversalInput/UniversalInput";
import Styles from "./UploadBookModal.module.scss";
import { UploadBookModalProps } from "./UploadBookModal.types";
import Chip from "../Chip";
import { useEffect, useState } from "react";
import { BookPayload } from "@/types/Books.types";
import { rgbaOpacity } from "@/utils/rgbaOpacity";
import {
  useCreateBook,
  useEditBook,
  useGetAllBooks,
} from "@/queries/Books.queries";
import { useGetAllCategories } from "@/queries/Categories.queries";

const UploadBookModal = ({ onClose, initialBookId }: UploadBookModalProps) => {
  const { mutate: editBookMutate, isPending: isPendingUpdate } = useEditBook();
  const { mutate: createBookMutate, isPending: isPendingCreate } =
    useCreateBook();
  const { data: allBooksData, isLoading: isLoadingBooks } = useGetAllBooks();
  const { data: allCategoriesData, isLoading: isLoadingcategoryIds } =
    useGetAllCategories();

  const [bookForm, setBookForm] = useState<BookPayload>({
    author: "",
    name: "",
    publisher: "",
    publishedIn: "",
    categoryIds: [],
  });

  useEffect(() => {
    if (initialBookId) {
      const initialBook = allBooksData?.find(
        (book) => book.bookId === initialBookId
      );

      if (initialBook) {
        const initialCategoryIds =
          initialBook.categories?.map((category) => category.categoryId) || [];

        setBookForm({
          author: initialBook?.author || "",
          categoryIds: initialCategoryIds,
          name: initialBook?.name || "",
          publishedIn: initialBook?.publishedIn || "",
          publisher: initialBook?.publisher || "",
        });
      }
    }
  }, [allBooksData, initialBookId]);

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

  const isEditing = Boolean(initialBookId);

  const isLoading =
    isPendingCreate ||
    isLoadingcategoryIds ||
    isLoadingBooks ||
    isPendingUpdate;
  const hascategoryIds = allCategoriesData && allCategoriesData.length > 0;
  const isEqualToInitialBook = isEditing
    ? allBooksData?.some(
        (book) =>
          book.bookId === initialBookId &&
          book.name.toLowerCase() === bookForm.name.toLowerCase() &&
          book.author.toLowerCase() === bookForm.author.toLowerCase() &&
          book.publisher.toLowerCase() === bookForm.publisher.toLowerCase() &&
          book.publishedIn === bookForm.publishedIn &&
          JSON.stringify(
            book.categories.map((category) => category.categoryId)
          ) === JSON.stringify(bookForm.categoryIds)
      )
    : false;

  const handleConfirm = () => {
    if (isLoading || isEqualToInitialBook) return;

    if (!isValidForm) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (isEditing) {
      editBookMutate(
        { bookId: initialBookId!, ...bookForm },
        {
          onSuccess: () => {
            alert("Livro atualizado com sucesso!");
            onClose();
          },
          onError: (error) => {
            alert("Erro ao atualizar livro! Tente novamente.");
            console.error("Error updating book:", error);
          },
        }
      );
      return;
    }

    createBookMutate(bookForm, {
      onSuccess: () => {
        alert("Livro criado com sucesso!");
        onClose();
      },
      onError: (error) => {
        alert("Erro ao criar livro! Tente novamente.");
        console.error("Error creating book:", error);
      },
    });
  };

  return (
    <BaseModal
      onClose={onClose}
      title={isEditing ? "Editar livro" : "Enviar livro"}
      onConfirm={handleConfirm}
      disableConfirm={!isValidForm || isLoading || isEqualToInitialBook}
      confirmLabel={isEditing ? "Confirmar edição" : "Confimar cadastro"}
      isLoadingConfirm={isLoading}
      confirmWidth={120}
    >
      <div className={Styles.Upload}>
        <h3 className={Styles.Upload_Title}>
          {isEditing
            ? "📚 Atualize as informações desse livro"
            : "📚 Registre um novo livro"}
        </h3>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
            />
            <UniversalInput
              label="Editora"
              placeholder="Ex: HarperCollins"
              required
              onChange={handleInputChange}
              type="text"
              value={bookForm?.publisher || ""}
              name="publisher"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
            />
            <UniversalInput
              label="Ano de publicação"
              placeholder="Ex: 1954"
              required
              onChange={handleInputChange}
              type="text"
              value={bookForm?.publishedIn || ""}
              name="publishedIn"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleConfirm();
                }
              }}
            />
          </div>
        </div>

        <div className={Styles.Divider} />

        <div className={Styles.UploadSection}>
          <p className={Styles.UploadSection_Title}>
            Selecione pelo menos 1 categoria:
          </p>

          <div className={Styles.Categories}>
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
