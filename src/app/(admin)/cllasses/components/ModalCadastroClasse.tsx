"use client";

import { useState } from "react";
import { criarClasse } from "@/actions/classes";

interface ModalCadastroClasseProps {
  aberto: boolean;
  aoFechar: () => void;
}

export default function ModalCadastroClasse({
  aberto,
  aoFechar,
}: ModalCadastroClasseProps) {
  const [nome, setNome] = useState("");
  const [professor, setProfessor] = useState("");
  const [loading, setLoading] = useState(false);

  if (!aberto) return null;

  async function salvar() {
    setLoading(true);

    const { error } = await criarClasse({
      nome,
      professor,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setNome("");
    setProfessor("");
    aoFechar();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nova Classe</h2>

        <div className="campo">
          <label>Nome da Classe</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>

        <div className="campo">
          <label>Professor</label>
          <input value={professor} onChange={(e) => setProfessor(e.target.value)} />
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