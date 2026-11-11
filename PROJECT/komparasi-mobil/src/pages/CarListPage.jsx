import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CarSpecCard from "../components/CarSpecCard";
import { Search, ArrowDownAZ, LayoutGrid, List as ListIcon, Star, Flame, BatteryCharging, ShieldAlert, Heart } from "lucide-react";

export default function CarListPage({ cars, onDelete, favorites, onToggleFav }) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000); // dalam juta

  useEffect(() => {
    if (location.state?.filterFav) setShowFavoritesOnly(true);
  }, [location]);

  const brands = ["Semua", ...new Set(cars.map((c) => c.brand))];

  let filteredCars = cars.filter((car) => {
    const s = search.toLowerCase();
    const carPriceJuta = (parseInt(car.price.replace(/\./g, "")) || 0) / 1000000;
    const matchSearch = car.name.toLowerCase().includes(s) || car.brand.toLowerCase().includes(s);
    const matchBrand = selectedBrand === "Semua" || car.brand === selectedBrand;
    const matchFav = showFavoritesOnly ? favorites.includes(car.id) : true;
    const matchPrice = carPriceJuta <= maxPrice;
    
    return matchSearch && matchBrand && matchFav && matchPrice;
  });

  filteredCars.sort((a, b) => {
    const prA = parseInt(a.price.replace(/\./g, "")) || 0, prB = parseInt(b.price.replace(/\./g, "")) || 0;
    const pwA = parseInt(a.power) || 0, pwB = parseInt(b.power) || 0;
    if (sortBy === "termurah") return prA - prB;
    if (sortBy === "termahal") return prB - prA;
    if (sortBy === "performa") return pwB - pwA;
    return 0;
  });

  const topPowerCar = [...cars].sort((a, b) => (parseInt(b.power) || 0) - (parseInt(a.power) || 0))[0];
  const evCount = cars.filter(c => c.engine.includes("Listrik") || c.engine.includes("EV")).length;

  return (
    <div className="page fade-in">
      <div className="colorful-stats-container">
        <div className="stat-card stat-sunset"><Star className="stat-icon" size={28} /><div className="stat-info"><span>Total Armada</span><strong>{cars.length} Unit</strong></div></div>
        <div className="stat-card stat-ocean"><Flame className="stat-icon" size={28} /><div className="stat-info"><span>Top Performa</span><strong>{topPowerCar?.name || "-"}</strong></div></div>
        <div className="stat-card stat-amethyst"><ShieldAlert className="stat-icon" size={28} /><div className="stat-info"><span>Total Brand</span><strong>{brands.length - 1} Merek</strong></div></div>
        <div className="stat-card stat-emerald"><BatteryCharging className="stat-icon" size={28} /><div className="stat-info"><span>Elektrifikasi</span><strong>{evCount} Unit EV</strong></div></div>
      </div>

      <div className="page-header list-header">
        <div className="header-title">
          <h1 className="holographic-text">{showFavoritesOnly ? "Koleksi Favorit" : "Master Catalog"}</h1>
          <p>Filter armada eksklusif berdasarkan kebutuhan dan budget.</p>
        </div>
        
        <div className="controls-group">
          <button className={`btn-toggle-fav ${showFavoritesOnly ? 'active' : ''}`} onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
            <Heart size={18} className={showFavoritesOnly ? "fill-pink text-pink" : ""} /> {showFavoritesOnly ? "Semua Mobil" : "Lihat Favorit"}
          </button>
          
          <div className="view-toggle">
            <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}><LayoutGrid size={18}/></button>
            <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}><ListIcon size={18}/></button>
          </div>
        </div>
      </div>

      <div className="advanced-filters">
        <div className="filter-row-top">
          <div className="search-box"><Search size={18} className="search-icon" /><input type="text" placeholder="Pencarian kode/brand..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="sort-box"><ArrowDownAZ size={18} className="search-icon" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Urutkan: Relevansi</option><option value="termurah">Termurah</option><option value="termahal">Termahal</option><option value="performa">Tenaga Maksimal</option>
            </select>
          </div>
        </div>
        
        <div className="filter-row-bottom">
          <div className="brand-scroll-area">
            <span className="filter-label">Merek:</span>
            <div className="brand-filters">{brands.map((b) => <button key={b} className={`filter-btn ${selectedBrand === b ? "active" : ""}`} onClick={() => setSelectedBrand(b)}>{b}</button>)}</div>
          </div>
          <div className="price-slider-area">
            <span className="filter-label">Batas Harga: Rp {maxPrice >= 10000 ? "10M+" : `${maxPrice} Juta`}</span>
            <input type="range" min="100" max="10000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="price-slider" />
          </div>
        </div>
      </div>

      {filteredCars.length === 0 ? <div className="no-data">Data metrik tidak ditemukan atau di luar budget.</div> : 
        <div className={viewMode === "grid" ? "grid-layout" : "list-layout"}>
          {filteredCars.map((car) => (
            <CarSpecCard 
              key={car.id} car={car} onDelete={onDelete} showDelete={true} viewMode={viewMode}
              isFav={favorites.includes(car.id)} onToggleFav={onToggleFav}
            />
          ))}
        </div>
      }
    </div>
  );
}