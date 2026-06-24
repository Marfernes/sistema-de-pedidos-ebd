"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buscarAlunosPorClasse } from "@/actions/alunos";
import { buscarClassePorId } from "@/actions/classes";
import ModalCadastroAluno from "./components/ModalCadastrarAlunos";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function AlunosPage({ params }: Props) {
  const [id, setId] = useState<string>("");
  const [alunos, setAlunos] = useState<any[]>([]);
  const [classe, setClasse] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    async function resolverParams() {
      const resolved = await params;
      setId(resolved.id);
    }

    resolverParams();
  }, [params]);


  async function carregarAlunos(classeId: string) {
    setLoading(true);

    const { data } = await buscarAlunosPorClasse(classeId);

    if (data) {
      setAlunos(data);
    }

    setLoading(false);
  }

  async function carregarClasse(classeId: string) {
    const { data } = await buscarClassePorId(classeId);

    if (data) {
      setClasse(data);
    }
  }

  useEffect(() => {
    if (id) {
      carregarAlunos(id);
      carregarClasse(id);
    }
  }, [id]);

  return (
    <div className="page">
      <h1 className="title">
        Alunos da Classe: {classe?.nome || "..."}
      </h1>

      <div className="top-actions">
        <Link href="/cllasses">
          <button className="btn btn-back">
            ← Voltar para Classes
          </button>
        </Link>

        <button
          className="btn btn-primary"
          onClick={() => setAberto(true)}
        >
          + Novo Aluno
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>

          <tbody>
            {alunos.length ? (
              alunos.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={1}>Nenhum aluno encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <ModalCadastroAluno
        aberto={aberto}
        aoFechar={() => {
          setAberto(false);
          if (id) carregarAlunos(id);
        }}
        classeId={id}
      />
    </div>
  );
}