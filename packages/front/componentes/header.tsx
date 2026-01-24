"use client";
import React from "react";
import styles from "./header.module.css"

const Header = () => {
return (
    <header className={styles.header}>
      {/* Barra superior */}
      <div className={styles.topBar}>
        Bienvenido 💗 pagos con tarjeta de crédito y débito por link de pago
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
        <div className={styles.logo}>
          BLOWY
        </div>

        {/* Navegación derecha */}
        <nav className={styles.navRight}>
          <div className={styles.dropdown}>
            <a href="#">CUENTA</a>
            <span className={styles.arrow}>▾</span>
          </div>

          <a href="#">CONTACTO</a>

          <span className={styles.icon}>Q</span>

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