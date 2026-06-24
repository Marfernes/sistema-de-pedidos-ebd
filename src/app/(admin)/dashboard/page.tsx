"use client";

import { useEffect, useState } from "react";
import { buscarResumoDashboard } from "@/actions/dashboard";
import "./page.css";

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function DashboardPage() {
  const [resumo, setResumo] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const { data } = await buscarResumoDashboard();
      setResumo(data);
    }

    load();
  }, []);

  if (!resumo) return <p>Carregando...</p>;

  return (
    <div className="dashboard">

      <div className="main">

        <div className="header">
          <h1>Dashboard</h1>
        </div>

        <div className="cards">

          {/* 🔵 TOTAL */}
          <div className="card card-blue">
            <h3>📊 Total de Pedidos</h3>
            <p>{resumo.total_pedidos}</p>
          </div>

          {/* 🟢 PAGOS */}
          <div className="card card-green">
            <h3>💰 Pagos</h3>
            <p>{resumo.total_pagos}</p>
          </div>

          {/* 🔴 PENDENTES */}
          <div className="card card-red">
            <h3>⏳ Pendentes</h3>
            <p>{resumo.total_pendentes}</p>
          </div>

          {/* 💵 TOTAL DINHEIRO */}
          <div className="card card-gold">
            <h3>💵 Total Arrecadado</h3>
            <p>{formatarMoeda(resumo.total_arrecadado)}</p>
          </div>

        </div>

      </div>

    </div>
  );
}