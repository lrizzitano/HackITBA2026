"use client";
import React from "react";
import styles from "./header.module.css"

const Header = () => {
return (
    <header className={styles.header}>
      {/* Barra superior */}
      <div className={styles.topBar}>
        
      </div>

      {/* Header principal */}
      <div className={styles.mainHeader}>
        {/* Navegación izquierda */}
        <nav className={styles.navLeft}>
          <a href="#">INICIO</a>

          <div className={styles.dropdown}>
            <a href="#">PRODUCTOS</a>
            <span className={styles.arrow}>▾</span>
          </div>

          <div className={styles.dropdown}>
            <a href="#">INFORMACIÓN</a>
            <span className={styles.arrow}>▾</span>
          </div>
        </nav>

        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            TRISHA
          </div>  
        </div>


        {/* Navegación derecha */}
        <nav className={styles.navRight}>

          <a href="#">CONTACTO</a>

          <div className={styles.cart}>
            🛒
            <span className={styles.cartCount}>1</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header