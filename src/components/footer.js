import * as React from "react";
import "../assets/footer.scss";

const hideFooter = () => {
    const footer = document.getElementById('footer_container');

    footer.style.display = "none";
}

const Footer = () => {
  return (
    <footer id="footer_container" onDoubleClick={hideFooter}>
      <p className="created_content">This Web Application Was Created By Chris Banks</p>
      <p id="version">Version 1.0.0 created 01/19/2022</p>
    </footer>
  );
};

export default Footer;
