"use client";

import { useState } from "react";
import { criarAluno } from "@/actions/alunos";

interface Props {
  aberto: boolean;
  aoFechar: () => void;
  classeId: string;
}

export default function ModalCadastroAluno({
  aberto,
  aoFechar,
  classeId,
}: Props) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  if (!aberto) return null;

  async function salvar() {
    setLoading(true);

    const { error } = await criarAluno({
      nome,
      classe_id: classeId,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setNome("");
    aoFechar();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Novo Aluno</h2>

        <div className="campo">
          <label>Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="acoes">
          <button onClick={aoFechar}>Cancelar</button>
          <button onClick={salvar} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}