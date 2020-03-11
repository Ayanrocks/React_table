import React from "react";

export default function Pagination({ increase, decrease }) {
  return (
    <div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}
