"use client";

import { useEffect, useState } from "react";
import { listarClasses } from "@/actions/classes";
import { criarPedido } from "@/actions/pedidos-publicos";

export default function PedidoPage() {
  const [classes, setClasses] = useState<any[]>([]);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [classeId, setClasseId] = useState("");

  // 🔥 AGORA PADRONIZADO (CORRETO PRO BACKEND)
  const [tipoRevista, setTipoRevista] = useState<"aluno" | "professor" | "capa_dura">("aluno");

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    async function carregar() {
      const { data } = await listarClasses();

      if (data) {
        setClasses(data);
      }
    }

    carregar();
  }, []);

  async function salvar() {
    if (!nome || !classeId || !tipoRevista) {
      setMensagemSucesso("⚠️ Preencha os campos obrigatórios.");
      return;
    }

    const { error } = await criarPedido({
      nome,
      telefone,
      classe_id: classeId,
      tipo_revista: tipoRevista, // 👈 agora correto
    });

    if (error) {
      setMensagemSucesso("❌ Erro ao enviar pedido. Tente novamente.");
      return;
    }

    setMensagemSucesso(
      "✅ Pedido efetuado com sucesso. Deus lhe abençoe grandemente!"
    );

    setNome("");
    setTelefone("");
    setClasseId("");
    setTipoRevista("aluno");

    setTimeout(() => {
      setMensagemSucesso("");
    }, 5000);
  }

  return (
    <div className="page">
      <h1 className="title">SOLICITAÇÃO DE REVISTA EBD</h1>

      <div className="card">

        {mensagemSucesso && (
          <div className="success-message">
            {mensagemSucesso}
          </div>
        )}

        <div className="campo">
          <label>Nome Completo *</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Telefone</label>
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Classe *</label>
          <select
            value={classeId}
            onChange={(e) => setClasseId(e.target.value)}
          >
            <option value="">Selecione uma classe</option>

            {classes.map((classe) => (
              <option key={classe.id} value={classe.id}>
                {classe.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Tipo da Revista *</label>

          <select
            value={tipoRevista}
            onChange={(e) =>
              setTipoRevista(e.target.value as any)
            }
          >
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="capa_dura">Capa Dura</option>
          </select>
        </div>

        <button className="btn-primary" onClick={salvar}>
          SOLICITAR REVISTA
        </button>

      </div>
    </div>
  );
}