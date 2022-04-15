import React from "react";
import css from "./style.css"

function Footer() {
    const date = new Date();
    const cutime = date.getFullYear();
    return(
       <footer className="bottom">
           <p className="para1">&copy; {cutime} All Right Reserved </p>
       </footer>
    );
}

export default Footer;