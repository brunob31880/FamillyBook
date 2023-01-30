import React from "react";
import { Audio } from "../../components/Audio/Audio";
// create a stateless component with props books and uid and category
// filter the books with the objectID equal to uid and category
// wich map the object tab and return a list of Book component
export const AudioList = ({
    audios,
    uid,
    category,
    contextMenuListener,
}: any) => {
    console.log("Audios=", audios)
    return (
        <>
            {audios
                //  .filter((object: any) => object.userId === uid)
                .filter((object: any) => {
                    //       if (category) return object.category === category;
                    //      else return true;
                    return true;
                })
                .map((object: any) => (
                    <Audio
                        key={object.objectId}
                        object={object}
                        handleContextMenu={(e: MouseEvent) =>
                            contextMenuListener(e, "video", object.objectId)
                        }
                    />
                ))}
        </>
    );
};