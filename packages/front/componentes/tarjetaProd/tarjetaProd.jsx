"use client";
import React from "react";
import styles from "./trajetaProd.module.css";


const TarjetaProd = ({product}) => {
    return(
        <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>{product.price}</p>
                <a className="botonPrincipal">Ver</a>
              </div>
        </div>
    );
};

export default TarjetaProd