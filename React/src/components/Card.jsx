import { useState } from "react";
import "./Card.css";

const Card = ({ cloth }) => {
  const {
    name,
    rating,
    description,
    price,
    category,
    image,
    badge,
    colors,
    sizes,
  } = cloth;
  return (
    <article className="card">
      <div className="card-media-wrap">
        <img className="card-media" src={image} alt={name} loading="lazy" />
        {badge ? <span className="card-badge">{badge}</span> : null}
      </div>

      <div className="card-content">
        <p className="card-category">{category}</p>
        <h3>{name}</h3>
        <p className="card-description">{description}</p>
        <div className="card-details">
          <span className="price">{price}</span>
          <span className="rating">{rating} / 5</span>
        </div>
        <p className="card-fit">Sizes: {sizes.join(" • ")}</p>
        <p className="card-fit">Colors: {colors.join(" • ")}</p>
      </div>
    </article>
  );
};

export default Card;
