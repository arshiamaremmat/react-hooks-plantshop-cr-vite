import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const BASE_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch on mount
useEffect(() => {
  fetch(BASE_URL)
    .then((r) => r.json())
    .then((data) =>
      setPlants((prev) => (prev.length === 0 ? data : prev))
    )
    .catch((err) => console.error("Failed to fetch plants:", err));
}, []);


  // Add after successful POST
  function handleAddPlant(newPlant) {
    setPlants((prev) => [newPlant, ...prev]);
  }

  // Derived list based on search
  const filteredPlants = plants.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search value={searchTerm} onChange={setSearchTerm} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;

