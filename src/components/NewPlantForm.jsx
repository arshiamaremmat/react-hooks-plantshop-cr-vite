import React, { useState } from "react";

const BASE_URL = "http://localhost:6001/plants";

function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "" // keep as string
  });
  const { name, image, price } = formData;

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // IMPORTANT: Do not coerce price to Number for the POST — tests expect a string
    const payload = {
      name: name.trim(),
      image: image.trim() || "https://via.placeholder.com/400",
      price: price.trim() // <-- keep as string
    };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const created = await res.json();
      onAddPlant?.(created);
      setFormData({ name: "", image: "", price: "" });
    } catch (err) {
      console.error("Failed to create plant:", err);
    }
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={handleChange}
          min="0"
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;


