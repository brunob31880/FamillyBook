import React from "react";
import {Video} from "../../components/Video/Video";
// create a stateless component with props books and uid and category
// filter the books with the objectID equal to uid and category
// wich map the object tab and return a list of Book component
export const VideoList = ({
    videos,
    uid,
    category,
    contextMenuListener,
}: any) => {
    return (
        <>
            {videos
                .filter((object: any) => object.userId === uid)
                .filter((object: any) => {
                    if (category) return object.category === category;
                    else return true;
                })
                .map((object: any) => (
                    <Video
                        key={object.objectId}
                        object={object}
                        handleContextMenu={(e: MouseEvent) =>
                            contextMenuListener(e, "book", object.objectId)
                        }
                    />
                ))}
        </>
    );
};