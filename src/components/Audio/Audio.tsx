import React, { useEffect } from "react";
import ReactAudioPlayer from 'react-audio-player';
/**
 * 
 * @param param0 
 * @returns 
 */
export const Audio = ({ object, handleContextMenu }: any) => {
  // let {jsmediatags} = window;
  //console.log("Media=",jsmediatags);
  useEffect(() => {
    console.log("Window=", window)
    /*
    jsmediatags.read(object.link, {
      onSuccess: function (tag) {
        var tags = tag.tags;
        console.log("Success " + tags)
        var image = tags.picture;
        if (image) {
          var blob = new Blob([new Uint8Array(image.data)], { type: image.format });
          var url = URL.createObjectURL(blob);
          document.getElementById("image-" + object.title).setAttribute('src', url);
        } else {
          document.getElementById("image-" + object.title).style.display = "none";
        }
      }
    });
    */
  }, [])
  return (
    <div id="img_anchor" onContextMenu={handleContextMenu} className="colu">
      <a target="_blank" href={object.link}>
        <div className="img-container">
          <img width="140px" height="140px" id={"image-" + object.title}></img>
          {object.title}
        </div>
      </a>
      <ReactAudioPlayer
        src={object.link}
        autoPlay
        controls
      />
    </div>


  );
};