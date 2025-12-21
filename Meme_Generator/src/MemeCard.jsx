import React from "react";
import "./styles/Memecard.css";
const MemeCard = ({ data }) => {
  const { url, author, title } = data;
  return (
    <div className="card">
      <img className="image" src={url} alt="Memes" />
      <p>{title}</p>
      <p>{author}</p>
    </div>
  );
};

export default MemeCard;
