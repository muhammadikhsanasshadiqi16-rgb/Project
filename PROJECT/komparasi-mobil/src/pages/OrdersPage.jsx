import { Receipt, Trash2, Calendar, CreditCard, Wallet, User, Phone, MapPin, CarFront } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage({ orders, onDeleteOrder }) {
  const navigate = useNavigate();

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1 className="holographic-text">Riwayat Pesanan (SPK)</h1>
        <p>Daftar Surat Pesanan Kendaraan yang tercatat di sistem.</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-data">
          <Receipt size={48} style={{ marginBottom: "12px", opacity: 0.5 }} />
          <p>Belum ada pesanan kendaraan yang tercatat.</p>
          <button
            className="btn-submit"
            onClick={() => navigate("/daftar")}
            style={{ maxWidth: "220px", margin: "20px auto 0" }}
          >
            Lihat Catalog Mobil
          </button>
        </div>
      ) : (
        <div className="grid-layout">
          {orders.map((order) => (
            <div key={order.id} className="premium-card" style={{ padding: "24px", gap: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "var(--accent-blue)", fontWeight: 700, letterSpacing: "1px" }}>
                    {order.spkNumber}
                  </span>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                    <Calendar size={12} /> {order.date}
                  </div>
                </div>
                <button className="btn-action btn-delete" onClick={() => onDeleteOrder(order.id)} title="Hapus Pesanan">
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <img src={order.carImage} alt={order.carName} style={{ width: "80px", height: "56px", objectFit: "cover", borderRadius: "10px", border: "1px solid var(--border)" }} />
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700 }}>{order.carName}</h3>
                  <div style={{ fontSize: "14px", color: "var(--accent-blue)", fontWeight: 700 }}>Rp {order.carPrice}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", background: "rgba(0,0,0,0.25)", padding: "14px", borderRadius: "12px", border: "1px solid var(--border)", fontSize: "13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><User size={14} className="text-muted" /> <strong>{order.customerName}</strong></div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}><Phone size={14} /> {order.phone}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)" }}><MapPin size={14} /> {order.address}</div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid var(--border)", fontSize: "13px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
                  {order.paymentMethod === "cash" ? <Wallet size={15} /> : <CreditCard size={15} />}
                  {order.paymentMethod === "cash" ? "Tunai / Cash" : `Kredit ${order.tenor} Bulan`}
                </span>
                <strong style={{ color: "var(--accent-emerald)" }}>
                  {order.paymentMethod === "cash" ? "Lunas (Diproses)" : `${order.monthlyInstallment}/bln`}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}