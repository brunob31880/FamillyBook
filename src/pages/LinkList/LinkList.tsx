import React from "react";
import Link from "../../components/Link/Link";
// create a stateless component with props links and uid and category
// filter the links with the objectID equal to uid and category
// wich map the object tab and return a list of Link component
export const LinkList = ({
  links,
  uid,
  category,
  contextMenuListener,
}: any) => {
  return (
    <>
      {links
        .filter((object: any) => object.userId === uid)
        .filter((object: any) => {
          if (category) return object.category === category;
          else return true;
        })
        .map((object: any) => (
          <Link
            key={object.objectId}
            object={object}
            handleContextMenu={(e: MouseEvent) =>
              contextMenuListener(e, "link", object.objectId)
            }
          />
        ))}
    </>
  );
};
