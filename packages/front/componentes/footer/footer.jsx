"use client";
import React from "react";
import styles from "./footer.module.css";
import { useState } from "react";
import { useEffect } from "react";

const FooterComp = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(err => console.error(err));
  }, []);




  return (
    <footer className={styles.siteFooter}>
      {/* TOP BENEFITS */}
      <div className={styles.footerBenefits}>
        <div className={styles.benefit}>
          <div className={styles.icon}>🚚</div>
          <h4>ENVÍOS A TODO EL PAÍS</h4>

              <div>
                <h2>Status del backend</h2>

                {data ? (
                  <div>
                    <p>Status: {data.status}</p>
                    <p>Uptime: {data.uptime}</p>
                    <p>Timestamp: {data.timestamp}</p>
                  </div>
                ) : (
                  <p>Cargando...</p>
                )}
              </div>

          <p>COMPRÁ SIN SALIR DE TU CASA</p>
        </div>

        <div className={styles.benefit}>
          <div className={styles.icon}>💳</div>
          <h4>HASTA 12 CUOTAS</h4>
          <p>CON TODAS LAS TARJETAS</p>
        </div>

        <div className={styles.benefit}>
          <div className={styles.icon}>🔒</div>
          <h4>COMPRA SEGURA</h4>
          <p>PROTEGEMOS TUS DATOS</p>
        </div>
      </div>

      {/* CHANGES / RETURNS */}
      <div className={styles.footerReturns}>
        <h2>Cambios y Devoluciones</h2>
        <p>
          Las devoluciones/ cambios son únicamente por fallas de fábrica. UNICAMENTE
          se aceptan devoluciones dentro del plazo de 24 hs entregado el producto
        </p>
      </div>

      {/* MAIN FOOTER BLOCK */}
      <div className={styles.footerMain}>
        <div className={styles.footerCol}>
          <h5>MEDIOS DE PAGO</h5>
          <div className={styles.logos}>
            <img src="/logos/mercadopago.png" alt="Mercado Pago" />
          </div>

          <h5 className={styles.mt24}>MEDIOS DE ENVÍO</h5>
          <div className={styles.logos}>
            <img src="/logos/andreani.png" alt="Andreani" />
          </div>
        </div>

        <div className={`${styles.footerCol} ${styles.centerCol}`}>
          {/* espacio en blanco intencional */}
        </div>

        <div className={`${styles.footerCol} ${styles.rightCol}`}>
          <h5>NUESTRAS REDES SOCIALES</h5>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialBtn}>
              📷
            </a>
          </div>

          <h5 className={styles.mt24}>CONTACTO</h5>
          <ul className={styles.contactList}>
            <li>✉️ blowy.importados@gmail.com</li>
            <li>📞 1130693072</li>
            <li>📍 CAPITAL FEDERAL</li>
            <li>› Botón de arrepentimiento</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className={styles.footerBottom}>
        <p>
          Tienda creada por <strong>Pablo David Gabarini</strong> paginas a medida
        </p>
      </div>
    </footer>
  );
};

export default FooterComp;
