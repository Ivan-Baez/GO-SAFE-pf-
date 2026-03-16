"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { userData, handleLogout } = useAuth();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

        .nav-link {
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #2a2a2a;
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: #1a3d2b; }

        .nav-logout {
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #2a2a2a;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-logout:hover { color: #c0392b; }

        .nav-search {
          width: 100%;
          max-width: 340px;
          padding: 10px 18px;
          border-radius: 10px;
          border: none;
          background: white;
          font-size: 14px;
          font-family: 'Nunito', sans-serif;
          color: #333;
          outline: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .nav-search::placeholder { color: #aaa; }
      `}</style>

      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#e6dfd5",
        padding: "12px 40px",
        width: "100%",
        gap: "24px",
      }}>

        {/* ── Logo ── */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <Image src="/logo.png" alt="GoSafe logo" width={80} height={80} />
        </Link>

        {userData?.token ? (
          <>
            {/* ── Buscador centro ── */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <input
                type="text"
                placeholder="Search your adventure"
                className="nav-search"
              />
            </div>

            {/* ── Links + cerrar sesión ── */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              flexShrink: 0,
            }}>
              <Link href="/A&Q"        className="nav-link">💬 chat</Link>
              <Link href="/cart"       className="nav-link">🛒 carrito</Link>
              <Link href="/dashboard"  className="nav-link">👤 dashboard</Link>

              {/* separador visual */}
              <div style={{ width: "1px", height: "18px", backgroundColor: "#bbb" }} />

              <button onClick={handleLogout} className="nav-logout">
                🚪 cerrar sesion
              </button>
            </div>
          </>
        ) : (
          /* ── Sin sesión: Ingresar / Registrarme ── */
          <div style={{ display: "flex", gap: "12px", marginLeft: "auto" }}>
            <Link href="/login" style={{
              padding: "9px 24px",
              border: "1.5px solid #333",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "'Nunito', sans-serif",
              color: "#333",
              textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Ingresar
            </Link>
            <Link href="/RegisterForBoth" style={{
              padding: "9px 24px",
              border: "1.5px solid #333",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "'Nunito', sans-serif",
              color: "#333",
              textDecoration: "none",
              transition: "background 0.2s",
            }}>
              Registrarme
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}