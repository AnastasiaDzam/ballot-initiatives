import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
      <div className={styles.footer}>
        <p>© 2024 Ваш сайт. Все права защищены.</p>
        <p>Разработано с любовью и вниманием к деталям.</p>
      </div>
  );
};

export default Footer;
