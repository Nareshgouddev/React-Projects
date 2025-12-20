import React from "react";
import "./Joke.css";

const Button = (props) => {
  console.log(props);
  return (
    <div>
      <button
        className="primary-button
      "
        onClick={props.callApi}
      >
        Generate
      </button>
    </div>
  );
};

export default Button;
