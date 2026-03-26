import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import { clothesData } from "../Clothes";
import "./Home.css";

const Home = () => {
  // Get top-rated products for featured section
  const featuredProducts = clothesData
    .filter((cloth) => cloth.rating >= 4.5)
    .slice(0, 4);

  // Get unique categories
  const categories = [
    "Essentials",
    "Denim",
    "Outerwear",
    "Streetwear",
    "Dresses",
    "Athleisure",
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO SYNTHETIC ATELIER</p>
          <h1 className="hero-title">Elevate Your Everyday Style</h1>
          <p className="hero-description">
            Discover curated collections of premium essentials and statement
            pieces. Designed for those who value quality, comfort, and timeless
            aesthetics.
          </p>
          <div className="hero-cta">
            <Link to="/product" className="btn btn-primary">
              Shop Now
            </Link>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <p>Free shipping over $120</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <p>New arrivals every Friday</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✓</span>
            <p>Easy 14-day returns</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link key={category} to="/product" className="category-card">
              <div className="category-icon">👕</div>
              <p>{category}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-heading">
          <h2>Featured Favorites</h2>
          <p>Hand-picked pieces with exceptional ratings and reviews</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map((cloth) => (
            <Card key={cloth.id} cloth={cloth} />
          ))}
        </div>
        <div className="section-cta">
          <Link to="/product" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </section>

      {/* USP Section */}
      <section className="usp-section">
        <div className="usp-item">
          <h3>Premium Quality</h3>
          <p>
            Carefully sourced materials and expert craftsmanship in every piece.
          </p>
        </div>
        <div className="usp-item">
          <h3>Sustainable</h3>
          <p>Committed to ethical production and eco-friendly practices.</p>
        </div>
        <div className="usp-item">
          <h3>Customer First</h3>
          <p>Dedicated support and hassle-free returns within 14 days.</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>
          Subscribe to get early access to new collections and exclusive offers
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
