import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

export default function AddCarPage({ onAddCar }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", brand: "", type: "SUV", year: "2024", price: "", engine: "", power: "", torque: "", acceleration: "", topSpeed: "", drivetrain: "FWD", seats: "5", transmission: "", fuel: "", image: "", features: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const featArray = formData.features ? formData.features.split(',').map(f => f.trim()) : [];
    onAddCar({ ...formData, features: featArray, id: Date.now() });
    alert("Unit berhasil diotorisasi dan masuk database.");
    navigate("/daftar");
  };

  return (
    <div className="page form-page fade-in">
      <div className="page-header"><h1 className="holographic-text">Registrasi Unit</h1><p>Input parameter dan metrik teknis ke dalam sistem master.</p></div>
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-row">
          <div className="form-group"><label>Brand Manufaktur</label><input type="text" name="brand" placeholder="Porsche / Tesla" value={formData.brand} onChange={handleChange} required /></div>
          <div className="form-group"><label>Seri / Model</label><input type="text" name="name" placeholder="911 GT3" value={formData.name} onChange={handleChange} required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Kategori Tipe</label><select name="type" value={formData.type} onChange={handleChange} className="form-select"><option value="SUV">SUV</option><option value="MPV">MPV</option><option value="Sedan">Sedan</option><option value="Hatchback">Hatchback</option><option value="EV">Listrik (EV)</option><option value="Sports">Sports Car</option></select></div>
          <div className="form-group"><label>Tahun Perakitan</label><input type="number" name="year" placeholder="2024" value={formData.year} onChange={handleChange} required /></div>
        </div>
        <div className="form-group"><label>Nilai Valuasi (Rp)</label><input type="text" name="price" placeholder="3.500.000.000" value={formData.price} onChange={handleChange} required /></div>
        <div className="form-separator">METRIK PERFORMA</div>
        <div className="form-row">
          <div className="form-group"><label>Mesin / Motor</label><input type="text" name="engine" placeholder="3000cc Twin-Turbo" value={formData.engine} onChange={handleChange} required /></div>
          <div className="form-group"><label>Transmisi</label><input type="text" name="transmission" placeholder="8-Speed PDK" value={formData.transmission} onChange={handleChange} required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Tenaga Maksimal (HP)</label><input type="text" name="power" placeholder="500 HP" value={formData.power} onChange={handleChange} required /></div>
          <div className="form-group"><label>Torsi Maksimal (Nm)</label><input type="text" name="torque" placeholder="450 Nm" value={formData.torque} onChange={handleChange} required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Akselerasi 0-100 (Detik)</label><input type="text" name="acceleration" placeholder="3.5 s" value={formData.acceleration} onChange={handleChange} required /></div>
          <div className="form-group"><label>Top Speed (km/h)</label><input type="text" name="topSpeed" placeholder="310 km/h" value={formData.topSpeed} onChange={handleChange} required /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Sistem Penggerak</label><select name="drivetrain" value={formData.drivetrain} onChange={handleChange} className="form-select"><option value="FWD">FWD (Depan)</option><option value="RWD">RWD (Belakang)</option><option value="AWD">AWD / 4x4</option></select></div>
          <div className="form-group"><label>Efisiensi (BBM/Baterai)</label><input type="text" name="fuel" placeholder="10 km/l" value={formData.fuel} onChange={handleChange} required /></div>
        </div>
        <div className="form-separator">DETAIL EKSTRA</div>
        <div className="form-row">
          <div className="form-group"><label>Kapasitas Kursi</label><input type="number" name="seats" placeholder="4" value={formData.seats} onChange={handleChange} required /></div>
          <div className="form-group"><label>Fitur Unggulan (Pisahkan Koma)</label><input type="text" name="features" placeholder="Launch Control, Aero Kit" value={formData.features} onChange={handleChange} /></div>
        </div>
        <div className="form-group"><label>URL Gambar (Direct Link)</label><input type="url" name="image" placeholder="https://..." value={formData.image} onChange={handleChange} /></div>
        <button type="submit" className="btn-submit"><Save size={18} /> Simpan ke Database</button>
      </form>
    </div>
  );
}