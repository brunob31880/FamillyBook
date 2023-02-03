import React from "react";
import { Button } from "react-materialize";
/**
 * 
 * @param param0 
 * @returns 
 */
export const Book = ({ object, handleContextMenu }: any) => {
  console.log("Object ", object.thumbnail)
  return (
    <div id="img_anchor" onContextMenu={handleContextMenu} className="colu">
      <a target="_blank" href={object.url}>
        <div className="img-container">
          {object.thumbnail && (
            <img
              width="100px"
              height="100px"
              className="fit-picture"
              src={object.thumbnail}
            ></img>
          )}
        </div>
      </a>
      <Button
        flat
        node="button"
        tooltip={object.descriptif}
        tooltipOptions={{ position: "bottom" }}
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        {object.title}
      </Button>
    </div>
  );
};
