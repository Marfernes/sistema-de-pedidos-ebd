"use client";

import { useEffect, useState } from "react";
import { buscarResumoDashboard } from "@/actions/dashboard";
import "./page.css";
import { PageTitle } from "@/components/PageTitle/PageTitle";

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

        <PageTitle title="Dashboard" />

        <div className="cards">

          <div className="card card-blue">
            <h3>📊 Total de Pedidos</h3>
            <p>{resumo.total_pedidos}</p>
          </div>

          <div className="card card-green">
            <h3>💰 Pagos</h3>
            <p>{resumo.total_pagos}</p>
          </div>

          <div className="card card-red">
            <h3>⏳ Pendentes</h3>
            <p>{resumo.total_pendentes}</p>
          </div>

          <div className="card card-gold">
            <h3>💵 Total Arrecadado</h3>
            <p>{formatarMoeda(resumo.total_arrecadado)}</p>
          </div>

        </div>

        <div className="share-card">
          <div className="share-text">
            <h3>📢 Compartilhar formulário</h3>
            <p>Envie o link para o grupo do WhatsApp e receba novos pedidos.</p>
          </div>

          <a
            className="btn-whatsapp"
            href="https://wa.me/?text=Faça seu pedido aqui:%20https://sistema-de-pedidos-ebd.vercel.app/pedidos-publicos"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar no WhatsApp
          </a>
        </div>

      </div>

    </div>
  );
}