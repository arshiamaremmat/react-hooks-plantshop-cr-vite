import React, { useState } from "react";

function PlantCard({ plant }) {
  const { name, image, price } = plant;
  // Non-persisting: local UI state only
  const [inStock, setInStock] = useState(true);

  return (
    <li className="card" data-testid="plant-item">
      <img src={image || "https://via.placeholder.com/400"} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price ?? 0}</p>
      {inStock ? (
        <button className="primary" onClick={() => setInStock(false)}>
          In Stock
        </button>
      ) : (
        <button onClick={() => setInStock(true)}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
