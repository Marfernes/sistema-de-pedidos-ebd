"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./layout.css";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

import Footer from "@/components/Footer";

import { Inter, Poppins } from "next/font/google";

// FONTES FORA DO COMPONENTE (CORRETO)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();

        if (!data?.user) {
          router.replace("/login");
          return;
        }

        setUsuario(data.user);
      } catch (error) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Carregando sistema...
      </div>
    );
  }

  return (
    <div className={`${inter.variable} ${poppins.variable} container`}>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-mark">EBD</span>
          <span className="logo-text">SYSTEM</span>
        </div>

        <nav className="nav">
          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? "active" : ""}
          >
            Dashboard
          </Link>

          <Link
            href="/congregations"
            className={pathname === "/congregations" ? "active" : ""}
          >
            Congregações
          </Link>

          <Link
            href="/pedidos"
            className={pathname === "/pedidos" ? "active" : ""}
          >
            Pedidos
          </Link>

          <Link
            href="/cllasses"
            className={pathname === "/classes" ? "active" : ""}
          >
            Classes
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <header className="header">

          <div className="user-info">
            <span>
              👤 {usuario?.nome ?? usuario?.email ?? "Usuário"}
            </span>

            <button className="btn-logout" onClick={logout}>
              <IoLogOutOutline />
              <span>Sair</span>
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="content">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </div>

    </div>
  );
}