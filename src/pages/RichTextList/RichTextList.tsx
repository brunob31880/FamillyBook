import React from "react";
import RichText from "../../components/RichText/RichText";
// create a stateless component with props links and uid and category
// filter the links with the objectID equal to uid and category
// wich map the object tab and return a list of Link component
export const RichTextList = ({
    richtext,
  uid,
  category,
  contextMenuListener,
}: any) => {
  return (
    <>
      {richtext
        .filter((object: any) => object.userId === uid)
        .filter((object: any) => {
          if (category) return object.category === category;
          else return true;
        })
        .map((object: any) => (
          <RichText
            key={object.objectId}
            object={object}
            handleContextMenu={(e: MouseEvent) =>
              contextMenuListener(e, "richtext", object.objectId)
            }
          />
        ))}
    </>
  );
};
