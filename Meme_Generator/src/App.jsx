import React, { useEffect, useState } from "react";
import "./App.css";
import MemeCard from "./MemeCard";
import Shimmar from "./Shimmar";

const App = () => {
  const [meme, setMeme] = useState(null);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const data = await fetch("https://meme-api.com/gimme/20");
    const Json = await data.json();
    setMeme(Json.memes);
  };

  return (
    <div>
      <h1>Meme Generator</h1>
      <div className="cards">
        {!meme ? (
          <Shimmar />
        ) : (
          meme.map((memes, i) => <MemeCard key={i} data={memes} />)
        )}
      </div>
    </div>
  );
};

export default App;
