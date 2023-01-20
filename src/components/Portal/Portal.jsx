import { useEffect } from "react";
import { createPortal } from "react-dom";
/**
 * 
 * @param param0 
 * @returns 
 */
export const Portal = ({children}) => {
  const mount = document.getElementById("root-portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el)
};

export default Portal;