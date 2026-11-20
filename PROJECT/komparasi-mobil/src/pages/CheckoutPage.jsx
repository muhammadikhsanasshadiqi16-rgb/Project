import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard, Wallet, CarFront, CheckCircle } from "lucide-react";

export default function CheckoutPage({ cars, onAddOrder }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === Number(id));

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [tenor, setTenor] = useState(12);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!car) {
    return (
      <div className="page fade-in" style={{ textAlign: "center", padding: "100px 0" }}>
        <h2>Unit tidak ditemukan.</h2>
        <button className="btn-submit" onClick={() => navigate("/daftar")} style={{ maxWidth: "200px", margin: "20px auto" }}>Kembali ke Catalog</button>
      </div>
    );
  }

  const priceNumber = parseInt(car.price.replace(/\./g, "")) || 0;
  const dp = priceNumber * 0.2;
  const principal = priceNumber - dp;
  const totalInterest = principal * 0.08 * (tenor / 12);
  const monthlyInstallment = (principal + totalInterest) / tenor;

  const formatRp = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      spkNumber: `SPK-${String(Date.now()).slice(-6)}`,
      date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      carName: car.name,
      carPrice: car.price,
      carImage: car.image,
      customerName,
      phone,
      email,
      address,
      paymentMethod,
      tenor,
      monthlyInstallment: formatRp(monthlyInstallment),
    };
    onAddOrder(newOrder);
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/pesanan");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="page fade-in checkout-success">
        <CheckCircle size={80} className="text-emerald" style={{ marginBottom: "20px" }} />
        <h1 className="holographic-text">Pesanan Diterima!</h1>
        <p>Surat Pesanan Kendaraan (SPK) untuk <strong>{car.name}</strong> telah tercatat.</p>
        <p className="text-muted">Mengarahkan ke halaman Riwayat Pesanan...</p>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Checkout Portal</h1>
        <p>Selesaikan transaksi kepemilikan kendaraan eksklusif Anda.</p>
      </div>

      <div className="checkout-wrapper">
        <div className="checkout-summary">
          <div className="summary-image">
            <img src={car.image} alt={car.name} />
            <div className="summary-badge">{car.brand}</div>
          </div>
          <div className="summary-details">
            <h2>{car.name}</h2>
            <div className="summary-specs">
              <span>Mesin: {car.engine}</span>
              <span>Warna: Obsidian Black (Default)</span>
              <span>VIN: Otomatis Digenerate</span>
            </div>
            <div className="summary-price-box">
              <span className="price-label">Harga OTR (Jakarta)</span>
              <span className="price-value">Rp {car.price}</span>
            </div>
          </div>
          <div className="security-badge">
            <ShieldCheck size={20} className="text-emerald" />
            <span>Transaksi Diamankan oleh Enkripsi SSL 256-bit</span>
          </div>
        </div>

        <form className="checkout-form modern-form" onSubmit={handleSubmit}>
          <div className="form-separator">Data Pemesan (Sesuai KTP)</div>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input type="text" required placeholder="Cth: Budi Santoso" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Nomor Telepon / WhatsApp</label>
              <input type="tel" required placeholder="0812-XXXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email Pemesan</label>
              <input type="email" required placeholder="budi@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Alamat Pengiriman Kendaraan</label>
            <input type="text" required placeholder="Jl. Sudirman No. 1, Pekanbaru" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="form-separator">Metode Pembayaran</div>
          <div className="payment-options">
            <div className={`payment-card ${paymentMethod === "cash" ? "active" : ""}`} onClick={() => setPaymentMethod("cash")}>
              <Wallet size={24} />
              <span>Cash / Tunai Keras</span>
            </div>
            <div className={`payment-card ${paymentMethod === "credit" ? "active" : ""}`} onClick={() => setPaymentMethod("credit")}>
              <CreditCard size={24} />
              <span>Leasing / Kredit</span>
            </div>
          </div>

          {paymentMethod === "credit" && (
            <div className="credit-simulation fade-in">
              <div className="form-group">
                <label>Pilih Tenor Cicilan</label>
                <select className="form-select" value={tenor} onChange={(e) => setTenor(Number(e.target.value))}>
                  <option value={12}>12 Bulan (1 Tahun)</option>
                  <option value={24}>24 Bulan (2 Tahun)</option>
                  <option value={36}>36 Bulan (3 Tahun)</option>
                  <option value={48}>48 Bulan (4 Tahun)</option>
                  <option value={60}>60 Bulan (5 Tahun)</option>
                </select>
              </div>
              <div className="simulation-box">
                <div className="sim-row"><span>Uang Muka (DP 20%)</span> <strong>{formatRp(dp)}</strong></div>
                <div className="sim-row"><span>Pokok Hutang</span> <strong>{formatRp(principal)}</strong></div>
                <div className="sim-row highlight"><span>Cicilan per Bulan</span> <strong>{formatRp(monthlyInstallment)}</strong></div>
              </div>
            </div>
          )}

          <button type="submit" className="btn-submit btn-checkout">
            <CarFront size={18} /> {paymentMethod === "cash" ? "Bayar Lunas Sekarang" : "Ajukan Kredit Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}