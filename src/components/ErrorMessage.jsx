import React from "react";

function ErrorMessage({ message }) {
  return (
    <div>
      <span>➖</span>
      <h1>{message}</h1>
    </div>
  );
}

export default ErrorMessage;
