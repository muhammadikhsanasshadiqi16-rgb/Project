import { useState } from "react";
import CarSpecCard from "../components/CarSpecCard";
import { ArrowLeftRight, Activity, Zap } from "lucide-react";

export default function ComparePage({ cars }) {
  const [car1Id, setCar1Id] = useState(cars[0]?.id || "");
  const [car2Id, setCar2Id] = useState(cars[1]?.id || "");
  const c1 = cars.find((c) => c.id === Number(car1Id));
  const c2 = cars.find((c) => c.id === Number(car2Id));

  const pN = (str) => parseFloat((str || "").match(/[\d.]+/)?.[0] || 0);
  const pPrice = (str) => parseInt((str || "").replace(/\./g, "")) || 0;

  const compareBigger = (val1, val2) => pN(val1) > pN(val2) ? 1 : pN(val1) < pN(val2) ? 2 : 0;
  const compareSmaller = (val1, val2) => pN(val1) < pN(val2) ? 1 : pN(val1) > pN(val2) ? 2 : 0;
  const comparePrice = (val1, val2) => pPrice(val1) < pPrice(val2) ? 1 : pPrice(val1) > pPrice(val2) ? 2 : 0; // Lebih murah menang

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="holographic-text">Matrix Komparasi</h1>
        <p>Analisis setiap parameter teknis dengan algoritma pendeteksi keunggulan otomatis.</p>
      </div>

      <div className="compare-selectors">
        <select value={car1Id} onChange={(e) => setCar1Id(e.target.value)} className="select-box glow-pink-border">
          <option value="">-- Pilih Kendaraan A --</option>
          {cars.map((c) => <option key={c.id} value={c.id}>{c.brand} {c.name}</option>)}
        </select>
        <div className="vs-badge"><ArrowLeftRight size={24} color="#fff" /></div>
        <select value={car2Id} onChange={(e) => setCar2Id(e.target.value)} className="select-box glow-cyan-border">
          <option value="">-- Pilih Kendaraan B --</option>
          {cars.map((c) => <option key={c.id} value={c.id}>{c.brand} {c.name}</option>)}
        </select>
      </div>

      {c1 && c2 && (
        <div className="matrix-container fade-in">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="sticky-header">Parameter Spesifikasi</th>
                <th className="th-pink sticky-header">{c1.name}</th>
                <th className="th-cyan sticky-header">{c2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-label">Visual Unit</td>
                <td><img src={c1.image} alt={c1.name} className="table-img" /></td>
                <td><img src={c2.image} alt={c2.name} className="table-img" /></td>
              </tr>
              <tr>
                <td className="row-label">Harga Valuasi</td>
                <td className={comparePrice(c1.price, c2.price) === 1 ? "winner-cell" : ""}>Rp {c1.price}</td>
                <td className={comparePrice(c1.price, c2.price) === 2 ? "winner-cell" : ""}>Rp {c2.price}</td>
              </tr>
              <tr>
                <td className="row-label"><Zap size={14}/> Tenaga Maksimal</td>
                <td className={compareBigger(c1.power, c2.power) === 1 ? "winner-cell" : ""}>{c1.power}</td>
                <td className={compareBigger(c1.power, c2.power) === 2 ? "winner-cell" : ""}>{c2.power}</td>
              </tr>
              <tr>
                <td className="row-label"><Activity size={14}/> Torsi Maksimal</td>
                <td className={compareBigger(c1.torque, c2.torque) === 1 ? "winner-cell" : ""}>{c1.torque}</td>
                <td className={compareBigger(c1.torque, c2.torque) === 2 ? "winner-cell" : ""}>{c2.torque}</td>
              </tr>
              <tr>
                <td className="row-label">Akselerasi (0-100)</td>
                <td className={compareSmaller(c1.acceleration, c2.acceleration) === 1 ? "winner-cell" : ""}>{c1.acceleration}</td>
                <td className={compareSmaller(c1.acceleration, c2.acceleration) === 2 ? "winner-cell" : ""}>{c2.acceleration}</td>
              </tr>
              <tr>
                <td className="row-label">Top Speed</td>
                <td className={compareBigger(c1.topSpeed, c2.topSpeed) === 1 ? "winner-cell" : ""}>{c1.topSpeed}</td>
                <td className={compareBigger(c1.topSpeed, c2.topSpeed) === 2 ? "winner-cell" : ""}>{c2.topSpeed}</td>
              </tr>
              <tr><td className="row-label">Mesin / Motor</td><td>{c1.engine}</td><td>{c2.engine}</td></tr>
              <tr><td className="row-label">Transmisi</td><td>{c1.transmission}</td><td>{c2.transmission}</td></tr>
              <tr><td className="row-label">Penggerak</td><td>{c1.drivetrain}</td><td>{c2.drivetrain}</td></tr>
              <tr><td className="row-label">Efisiensi Konsumsi</td><td>{c1.fuel}</td><td>{c2.fuel}</td></tr>
              <tr><td className="row-label">Fitur Ekstra</td><td>{c1.features?.join(", ")}</td><td>{c2.features?.join(", ")}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}