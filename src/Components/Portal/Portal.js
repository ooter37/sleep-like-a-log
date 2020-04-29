import { useState } from "react";
import { createPortal } from "react-dom";

// const Portal = ({children}) => {
//   const mount = document.getElementById("portal-root");
//   console.log(mount)
//   const el = document.createElement("div");

//   useEffect(() => {
//     mount.appendChild(el);
//     return () => mount.removeChild(el);
//   }, [el, mount]);

//   return createPortal(children, el)
// };

const Portal = (props, children) => {
    const mount = document.getElementById("portal-root");
    const el = document.createElement("div");
    props.mount.appendChild(el)
    return createPortal(children, el)
}

export default Portal;