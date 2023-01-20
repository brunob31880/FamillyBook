import React from "react";
import { Button } from "react-materialize";
//create a stateless component with props object and handleContextMenu
// wich return a div with a link to the url of the object
// and a button with the name of the object
export const Book = ({ object, handleContextMenu }: any) => {
  return (
    <div id="img_anchor" onContextMenu={handleContextMenu} className="colu">
      <a target="_blank" href={object.url}>
        <div className="img-container">
          {object.vignette && (
            <img
              className="fit-picture"
              src={object.vignette.url}
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
        {object.name}
      </Button>
    </div>
  );
};
