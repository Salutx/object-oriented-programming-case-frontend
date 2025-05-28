"use client";

import Book from "@/components/Book";
import Styles from "./Main.module.scss";
import InputSearch from "./components/InputSearch";
import EmptyException from "@/components/EmptyException/EmptyException";
import { useGetAllBooks } from "@/queries/Books.queries";
import getCounterFromArray from "@/utils/getCounterFromArray";
import useSearch from "@/hooks/useSearch";
import useCatalogContext from "@/hooks/useCatalogContext";
import { useMemo } from "react";
import { useGetAllUsers } from "@/queries/Users.queries";

const Main = () => {
  const { filteredCategories } = useCatalogContext();
  const { data: booksData } = useGetAllBooks();
  const { data: usersData } = useGetAllUsers();

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

  const filteredBooks = useMemo(() => {
    if (!filteredCategories || filteredCategories.length === 0)
      return filteredOptions;

    return filteredOptions.filter((book) => {
      if (!book?.categories || book?.categories.length === 0) return false;
      return book?.categories.some((category) =>
        filteredCategories.includes(category.categoryId)
      );
    });
  }, [filteredCategories, filteredOptions]);

  const booksCounter = getCounterFromArray(filteredBooks);

  return (
    <main className={Styles.Main}>
      <div className={Styles.MainHeader}>
        <div className={Styles.MainHeader__Side}>
          <div className={Styles.MainHeader__Counter}>
            <p className={Styles.MainHeader__Counter_Label}>{booksCounter}</p>
          </div>
          <h2 className={Styles.MainHeader_Title}>Livros no catálogo</h2>
        </div>

        <InputSearch
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Pesquisar por título, categoria, autor..."
        />
      </div>
      {filteredBooks && filteredBooks?.length > 0 && (
        <div className={Styles.MainContent}>
          {filteredBooks?.map((book, index) => {
            const createdBy = usersData?.find(
              (user) => user.userId === book?.createdBy
            );

            return (
              <Book
                key={index}
                title={book?.name}
                author={book?.author}
                categories={book?.categories}
                createdAt={createdBy?.name || "Desconhecido"}
              />
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
