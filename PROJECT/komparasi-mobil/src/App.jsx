import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ComparePage from "./pages/ComparePage";
import CarListPage from "./pages/CarListPage";
import AddCarPage from "./pages/AddCarPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import { initialCars } from "./data/carsData";

export default function App() {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem("showroom-data");
    return saved ? JSON.parse(saved) : initialCars;
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("showroom-favs");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("showroom-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => localStorage.setItem("showroom-data", JSON.stringify(cars)), [cars]);
  useEffect(() => localStorage.setItem("showroom-favs", JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem("showroom-orders", JSON.stringify(orders)), [orders]);

  const handleAddCar = (newCar) => setCars([...cars, newCar]);
  const handleDeleteCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
    setFavorites(favorites.filter((favId) => favId !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
  };

  const handleAddOrder = (newOrder) => setOrders([newOrder, ...orders]);
  const handleDeleteOrder = (id) => setOrders(orders.filter((order) => order.id !== id));

  return (
    <BrowserRouter>
      <Navbar favCount={favorites.length} orderCount={orders.length} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<ComparePage cars={cars} />} />
          <Route
            path="/daftar"
            element={<CarListPage cars={cars} onDelete={handleDeleteCar} favorites={favorites} onToggleFav={toggleFavorite} />}
          />
          <Route path="/tambah" element={<AddCarPage onAddCar={handleAddCar} />} />
          <Route path="/checkout/:id" element={<CheckoutPage cars={cars} onAddOrder={handleAddOrder} />} />
          <Route path="/pesanan" element={<OrdersPage orders={orders} onDeleteOrder={handleDeleteOrder} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}