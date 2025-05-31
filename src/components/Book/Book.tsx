import Image from "next/image";
import Styles from "./Book.module.scss";
import { BookProps } from "./Book.types";
import Chip from "../Chip";
import { generateColorFromName } from "@/utils/generateColorFromName";
import clsx from "clsx";
import Icon from "../Icon";

const Book = ({
  title,
  author,
  onClick,
  categories,
  imagePath = "/book-placeholder.png",
  isFavorited = false,
  disabled,
  onFavorite,
  createdAt,
  onDelete,
  onEdit,
}: BookProps) => {
  const firstCategory = categories?.[0];

  return (
    <div className={Styles.Book}>
      <button
        className={Styles.BookPreview}
        onClick={onClick}
        disabled={disabled}
      >
        <div
          className={clsx(
            Styles.BookFavorite,
            isFavorited && Styles.BookFavorite_Favorited
          )}
          onClick={onFavorite}
        >
          <Icon name={isFavorited ? "heart" : "heart-filled"} />
        </div>
        <div className={Styles.BookPreview__Overlay}>
          <div className={Styles.BookPreview__Overlay__Footer}>
            <p className={Styles.BookPreview__Overlay_PublishedBy}>
              Enviado por {createdAt}
            </p>

            <div className={Styles.BookPreview__Actions}>
              <div className={Styles.BookPreview__Action} onClick={onEdit}>
                <Icon name="edit-white" />
              </div>
              <div className={Styles.BookPreview__Action} onClick={onDelete}>
                <Icon name="trash-can-white" />
              </div>
            </div>
          </div>
        </div>
        {imagePath && <Image src={imagePath} alt={title} fill />}
      </button>
      <div className={Styles.BookContent}>
        <div className={Styles.BookContent__Category}>
          <Chip
            label={firstCategory?.name}
            mainColor={generateColorFromName(firstCategory?.name)}
          />

          {categories && categories?.length > 1 && (
            <span className={Styles.CategoryMore}></span>
          )}
        </div>
        <div className={Styles.BookContent__Infos}>
          <h1 className={Styles.BookContent_Title} title={title}>
            {title}
          </h1>
          <p className={Styles.BookContent_Author} title={author}>
            {author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
