import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ComparePage from "./pages/ComparePage";
import CarListPage from "./pages/CarListPage";
import AddCarPage from "./pages/AddCarPage";
import { initialCars } from "./data/carsData";

export default function App() {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem("showroom-data");
    return saved ? JSON.parse(saved) : initialCars;
  });

  // State untuk menyimpan ID mobil favorit
  const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("showroom-favs");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  useEffect(() => localStorage.setItem("showroom-data", JSON.stringify(cars)), [cars]);
  useEffect(() => localStorage.setItem("showroom-favs", JSON.stringify(favorites)), [favorites]);

  const handleAddCar = (newCar) => setCars([...cars, newCar]);
  const handleDeleteCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
    setFavorites(favorites.filter(favId => favId !== id));
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar favCount={favorites.length} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ComparePage cars={cars} />} />
          <Route 
            path="/daftar" 
            element={<CarListPage cars={cars} onDelete={handleDeleteCar} favorites={favorites} onToggleFav={toggleFavorite} />} 
          />
          <Route path="/tambah" element={<AddCarPage onAddCar={handleAddCar} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}