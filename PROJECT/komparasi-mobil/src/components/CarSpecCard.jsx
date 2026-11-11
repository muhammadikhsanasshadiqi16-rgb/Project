import { useState } from "react";
import { Settings, Zap, Gauge, Droplet, Trash2, CarFront, Calendar, Activity, Timer, Users, Cog, ChevronDown, ChevronUp, Shield, Ruler, Heart } from "lucide-react";

export default function CarSpecCard({ car, onDelete, showDelete = false, viewMode = "grid", isFav, onToggleFav }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!car) return (
    <div className="card empty-card">
      <div className="empty-icon-wrapper"><CarFront size={64} color="#64748b" /></div>
      <p>Pilih unit kendaraan dari sistem untuk merender data spesifikasi.</p>
    </div>
  );

  const powerPercent = Math.min((parseFloat(car.power) / 600) * 100, 100);
  const accelPercent = Math.max(100 - ((parseFloat(car.acceleration) / 15) * 100), 10);
  const isEV = car.engine?.toLowerCase().includes("listrik") || car.engine?.toLowerCase().includes("ev");

  return (
    <div className={`card premium-card ${viewMode === "list" ? "list-mode" : "grid-mode"}`}>
      <div className="card-image-container">
        <img src={car.image} alt={car.name} className="car-image" />
        <div className="image-overlay"></div>
        <div className="badge-group">
          <span className="brand-badge">{car.brand}</span>
          <span className="type-badge">{car.type}</span>
        </div>
        
        <div className="top-actions">
          {onToggleFav && (
            <button className={`btn-action btn-fav ${isFav ? 'active' : ''}`} onClick={() => onToggleFav(car.id)} title="Simpan ke Favorit">
              <Heart size={18} className={isFav ? "fill-pink" : ""} />
            </button>
          )}
          {showDelete && <button className="btn-action btn-delete" onClick={() => onDelete(car.id)} title="Hapus Data"><Trash2 size={18} /></button>}
        </div>
      </div>
      
      <div className="card-content">
        <div className="card-header-info">
          <div className="title-row">
            <h2 className="car-name">{car.name}</h2>
            <span className="year-badge"><Calendar size={12} /> {car.year}</span>
          </div>
          <h3 className="car-price">Rp {car.price}</h3>
          
          <div className="features-list">
            {car.features?.map((feat, idx) => <span key={idx} className="feature-tag">{feat}</span>)}
          </div>
        </div>

        <div className="specs-grid">
          <div className="spec-item"><Settings size={16} className="spec-icon color-1" /><div><span>Mesin</span><strong>{car.engine}</strong></div></div>
          <div className="spec-item"><Cog size={16} className="spec-icon color-2" /><div><span>Transmisi</span><strong>{car.transmission}</strong></div></div>
          <div className="spec-item"><Activity size={16} className="spec-icon color-3" /><div><span>Torsi</span><strong>{car.torque}</strong></div></div>
          <div className="spec-item"><Users size={16} className="spec-icon color-4" /><div><span>Kapasitas</span><strong>{car.seats} Kursi</strong></div></div>
        </div>

        <div className="card-footer-action">
          <button className="expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <><ChevronUp size={16} /> Tutup Detail</> : <><ChevronDown size={16} /> Buka Metrik Lengkap</>}
          </button>
        </div>

        {isExpanded && (
          <div className="expanded-content fade-in">
            <div className="spec-visuals">
              <div className="visual-row">
                <div className="visual-label"><Zap size={14} className="text-pink" /> Tenaga ({car.power})</div>
                <div className="progress-bg"><div className="progress-fill fill-pink" style={{ width: `${powerPercent}%` }}></div></div>
              </div>
              <div className="visual-row">
                <div className="visual-label"><Timer size={14} className="text-cyan" /> Akselerasi 0-100 ({car.acceleration})</div>
                <div className="progress-bg"><div className="progress-fill fill-cyan" style={{ width: `${accelPercent}%` }}></div></div>
              </div>
              <div className="visual-row">
                <div className="visual-label"><Droplet size={14} className={isEV ? 'text-emerald' : 'text-purple'} /> Konsumsi ({car.fuel})</div>
              </div>
            </div>
            
            <div className="extra-specs-grid">
              <div className="extra-item"><Ruler size={14}/> Dimensi: {car.length} x {car.width}</div>
              <div className="extra-item"><Shield size={14}/> Keamanan: {car.safety}</div>
              <div className="extra-item full-width"><Shield size={14}/> Garansi: {car.warranty}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}