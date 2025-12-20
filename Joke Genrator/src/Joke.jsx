import { useState } from "react";
import Button from "./Button";
import "./Joke.css";

const Joke = () => {
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchApi = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://sv443.net/jokeapi/v2/joke/Programming?type=single"
      );
      if (!response.ok) {
        throw new Error("Bad response");
      }
      const data = await response.json();
      setJoke(data?.joke ?? "No joke returned.");
    } catch (err) {
      setError("Failed to Load Data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="joke-container">
      <h2 className="joke-title">Joke Generator</h2>
      <span className="status-text">
        {loading ? "loading..." : "Ready for a joke?"}
      </span>
      <Button callApi={fetchApi} disabled={loading} label="Get Joke" />
      {error && <p className="error-text">{error}</p>}
      {joke && <p className="joke-text">{joke}</p>}
    </div>
  );
};

export default Joke;
