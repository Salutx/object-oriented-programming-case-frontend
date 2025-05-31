"use client";

import Book from "@/components/Book";
import Styles from "./Main.module.scss";
import InputSearch from "./components/InputSearch";
import EmptyException from "@/components/EmptyException/EmptyException";
import { useDeleteBook, useGetAllBooks } from "@/queries/Books.queries";
import getCounterFromArray from "@/utils/getCounterFromArray";
import useSearch from "@/hooks/useSearch";
import useCatalogContext from "@/hooks/useCatalogContext";
import { useMemo } from "react";
import Icon from "@/components/Icon";
import GenericModal from "@/components/GenericModal/GenericModal";
import UploadBookModal from "@/components/UploadBookModal";
import {
  useFavoriteBookMutation,
  useFavoriteBookQuery,
} from "@/hooks/useFavoriteBook";

const Main = () => {
  const { mutate: deleteBookMutate } = useDeleteBook();
  const { filteredCategories, filteredByFavorites } = useCatalogContext();
  const { data: booksData } = useGetAllBooks();
  const { mutate: favoriteBooksMutate } = useFavoriteBookMutation();
  const { data: favoriteBooksData } = useFavoriteBookQuery();

  const formattedBooksData = useMemo(() => {
    return booksData?.map((book) => ({
      ...book,
      categoriesString:
        book?.categories
          ?.map((category) => category.name)
          .join(", ")
          .toString() || "",
    }));
  }, [booksData]);

  const { filteredOptions, searchText, setSearchText } = useSearch(
    ["name", "author", "categoriesString"],
    formattedBooksData
  );

  const filteredBooksByCategories = useMemo(() => {
    if (!filteredCategories || filteredCategories.length === 0)
      return filteredOptions;

    const filteredByCategories = filteredOptions.filter((book) => {
      if (!book?.categories || book?.categories.length === 0) return false;
      return book?.categories.some((category) =>
        filteredCategories.includes(category.categoryId)
      );
    });

    return filteredByCategories;
  }, [filteredCategories, filteredOptions]);

  const filteredBooks = useMemo(() => {
    if (filteredByFavorites) {
      return filteredBooksByCategories.filter((book) =>
        favoriteBooksData?.includes(book?.bookId)
      );
    }

    return filteredBooksByCategories;
  }, [filteredByFavorites, filteredBooksByCategories, favoriteBooksData]);

  const booksCounter = getCounterFromArray(filteredBooks);

  const handleDeleteBook = (bookId: number) => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita."
    );

    if (!confirmDelete) return;

    deleteBookMutate(bookId, {
      onSuccess: () => {
        alert("Livro excluído com sucesso!");
      },
      onError: () => {
        alert("Erro ao excluir livro. Tente novamente mais tarde.");
      },
    });
  };

  const handleFavoriteBook = (bookId: number) => {
    favoriteBooksMutate(bookId);
  };

  return (
    <main className={Styles.Main}>
      <div className={Styles.MainHeader}>
        <div className={Styles.MainHeader__Side}>
          <div className={Styles.MainHeader__Counter}>
            <p className={Styles.MainHeader__Counter_Label}>{booksCounter}</p>
          </div>
          <h2 className={Styles.MainHeader_Title}>Livros no catálogo</h2>
        </div>

        <div className={Styles.MainHeader__Side}>
          <GenericModal
            RenderController={({ onClick }) => (
              <button className={Styles.AddButton} onClick={onClick}>
                <Icon name="upload" />
                <p className={Styles.AddButton_Label}>Enviar livro</p>
              </button>
            )}
          >
            {({ onClose }) => <UploadBookModal onClose={onClose} />}
          </GenericModal>

          <InputSearch
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Pesquisar por título, categoria, autor..."
          />
        </div>
      </div>
      {filteredBooks && filteredBooks?.length > 0 && (
        <div className={Styles.MainContent}>
          {filteredBooks?.map((book, index) => {
            return (
              <GenericModal
                key={book?.bookId || index}
                RenderController={({ onClick }) => {
                  const isFavorited = favoriteBooksData?.includes(book?.bookId);

                  return (
                    <Book
                      key={index}
                      title={book?.name}
                      author={book?.author}
                      categories={book?.categories}
                      createdAt={book?.createdBy?.name || "Desconhecido"}
                      onDelete={() => handleDeleteBook(book?.bookId)}
                      onFavorite={() => handleFavoriteBook(book?.bookId)}
                      onEdit={onClick}
                      isFavorited={isFavorited}
                    />
                  );
                }}
              >
                {({ onClose }) => (
                  <UploadBookModal
                    onClose={onClose}
                    initialBookId={book?.bookId}
                  />
                )}
              </GenericModal>
            );
          })}
        </div>
      )}

      {(!filteredBooks || filteredBooks?.length === 0) && (
        <div className={Styles.MainEmpty}>
          <EmptyException
            title="Nenhum livro disponível"
            description="Esperendo por novos livros no catálogo, volte mais tarde!"
          />
        </div>
      )}
    </main>
  );
};

export default Main;
