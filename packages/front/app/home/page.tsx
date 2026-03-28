import React from "react";
import styles from "./home.module.css"
import Header from "@/componentes/header";
import TarjetaProd from "@/componentes/tarjetaProd/tarjetaProd";
import FooterComp from "@/componentes/footer/footer"

const HomePage = () => {
  // Datos simulados basados en tu imagen
  const products = [
    {
      id: 1,
      name: "Z ADIG CLASICA- cadena plateada",
      price: "$159.000,00",
      image: "/collar.png", // Reemplaza con tus rutas reales
    },
    {
      id: 2,
      name: "Zadig Rock clasica",
      price: "$85.000,00",
      image: "/collar.png",
    },
    {
      id: 3,
      name: "Zadig Rock mat negra",
      price: "$88.000,00",
      image: "/collar.png",
    },
    {
      id: 4,
      name: "YSL CUERO CLASICA",
      price: "$140.000,00",
      image: "/collar.png",
    },
        {
      id: 5,
      name: "Z ADIG CLASICA- cadena plateada",
      price: "$159.000,00",
      image: "/collar.png", // Reemplaza con tus rutas reales
    },
    {
      id: 6,
      name: "Zadig Rock clasica",
      price: "$85.000,00",
      image: "/collar.png",
    },
    {
      id: 7,
      name: "Zadig Rock mat negra",
      price: "$88.000,00",
      image: "/collar.png",
    },
    {
      id: 8,
      name: "YSL CUERO CLASICA",
      price: "$140.000,00",
      image: "/collar.png",
    }

  ];

  return (
    <div className={styles.home}>
      <Header />

      {/* Sección del Banner (Imagen cortada superior) */}
      <div className={styles.heroBanner}>
        {/* Aquí iría tu imagen de banner. Usa <img /> o el componente <Image /> de Next */}
        <img 
            src="/trishaBanner.jpeg" 
            alt="Banner de colección" 
            className={styles.bannerImage} 
        />
      </div>

      <main className={styles.mainContent}>
        <h1 className={styles.sectionTitle}>Todos los productos</h1>

        <div className={styles.productGrid}>
          {products.map((product) => (
          <TarjetaProd key={product.id} product={product} />
          ))}
        </div>
      </main>

      <FooterComp/>
    </div>
  );
};

export default HomePage;