import Card from "./Card";
import { clothesData } from "../Clothes";
import "./Product.css";
import { useState } from "react";

const Product = () => {
  const [top, setTop] = useState(clothesData);
  function ShowAll() {
    setTop(clothesData);
  }
  function topRated() {
    const filter = clothesData.filter((cloth) => cloth.rating >= 4.8);
    setTop(filter);
  }
  return (
    <main className="brand-page">
      <header className="hero-section">
        <p className="eyebrow">SYNTHETIC ATELIER</p>
        <h1>Seasonal Staples That Look Tailored, Feel Effortless.</h1>
        <p className="hero-copy">
          Elevated essentials inspired by street silhouettes and premium
          textures. Shop curated drops built for daily wear, city nights, and
          weekend escapes.
        </p>
        <div className="hero-meta">
          <span>Free shipping over $120</span>
          <span>New arrivals every Friday</span>
          <span>Easy 14-day returns</span>
        </div>
      </header>

      <section className="collection-strip" aria-label="Category highlights">
        <p>Trending:</p>
        <ul>
          <li>Outerwear</li>
          <li>Denim</li>
          <li>Knitwear</li>
          <li>Athleisure</li>
          <li>Accessories</li>
        </ul>
      </section>
      <div>
        <button onClick={ShowAll}>Show All</button>
        <button onClick={topRated}>TOP RATED ONES</button>
      </div>
      <section className="product-section" aria-label="Top picks products">
        <div className="section-heading">
          <h2>Top Picks</h2>
          <p>Hand-selected pieces with premium finish and highest reviews.</p>
        </div>
        <div className="product-grid">
          {top.map((cloth) => (
            <Card key={cloth.id} cloth={cloth} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Product;
