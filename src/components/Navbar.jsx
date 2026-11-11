import { NavLink } from "react-router-dom";
import { CarFront, Scale, List, PlusCircle, Sparkles, Heart } from "lucide-react";

export default function Navbar({ favCount }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-logo"><CarFront size={28} /></div>
        <div className="brand-text">
          <span>AutoCompare</span>
          <span className="brand-sub">Holographic Edition</span>
        </div>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/"><Scale size={18} /> Matrix</NavLink></li>
        <li><NavLink to="/daftar"><List size={18} /> Catalog</NavLink></li>
        <li><NavLink to="/tambah"><PlusCircle size={18} /> Registrasi</NavLink></li>
        {/* Tombol Wishlist */}
        <li>
          <NavLink to="/daftar" className="wishlist-nav" state={{ filterFav: true }}>
            <Heart size={18} className={favCount > 0 ? "text-pink fill-pink" : ""} /> 
            Favorit {favCount > 0 && <span className="badge-count">{favCount}</span>}
          </NavLink>
        </li>
      </ul>
      <div className="nav-status">
        <Sparkles size={16} /> <span>System Online</span>
      </div>
    </nav>
  );
}