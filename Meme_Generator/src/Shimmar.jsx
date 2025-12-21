import React from "react";
import "./styles/shimmar.css";

const DEFAULT_PLACEHOLDER_COUNT = 20;

const Shimmar = ({ count = DEFAULT_PLACEHOLDER_COUNT }) => (
  <div className="shimmer-grid">
    {Array.from({ length: count }).map((_, index) => (
      <div className="shimmer-card" key={index}>
        <div className="shimmer-block shimmer-image" />
        <div className="shimmer-block shimmer-title" />
        <div className="shimmer-block shimmer-meta" />
      </div>
    ))}
  </div>
);

export default Shimmar;
