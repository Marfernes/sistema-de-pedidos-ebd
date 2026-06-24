"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./layout.css";

import { Inter, Poppins } from "next/font/google";

// ✅ FONTES FORA DO COMPONENTE (CORRETO)
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

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
        <div className="logo">📖 EBD System</div>

        <nav className="nav">
          <Link href="/dashboard">🏠 Dashboard</Link>
          <Link href="/congregations">🏛 Congregações</Link>
          <Link href="/pedidos">📦 Pedidos</Link>
          <Link href="/cllasses">📚 Classes</Link>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <header className="header">
          <h3>Sistema de Pedidos EBD</h3>

          <div>
            👤 Usuário logado
          </div>
        </header>

        {/* CONTENT */}
        <main className="content">
          {children}
        </main>

      </div>

    </div>
  );
}