import React from "react";
import Book from "../../components/Book/Book";
// create a stateless component with props books and uid and category
// filter the books with the objectID equal to uid and category
// wich map the object tab and return a list of Book component
export const BookList = ({
    books,
    uid,
    category,
    contextMenuListener,
}: any) => {
  //  console.log("Books ", books)
    return (
        <>
            {books
                .filter((object: any) => object.userId === uid)
                // .filter((object: any) => {
                //     if (category) return object.category === category;
                //     else return true;
                // })
                .map((object: any) => (
                    <Book
                        key={object.objectId}
                        object={object}
                        handleContextMenu={(e: MouseEvent) =>
                            contextMenuListener(e, "books", object.objectId)
                        }
                    />
                ))}
        </>
    );
};