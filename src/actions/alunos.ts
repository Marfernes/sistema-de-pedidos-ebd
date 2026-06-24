"use server";

import { supabase } from "@/lib/supabase/client";

export async function buscarAlunosPorClasse(classeId: string) {
  const { data, error } = await supabase
    .from("alunos")
    .select("*")
    .eq("classe_id", classeId);

  return { data, error };
}

// ➕ criar aluno
export async function criarAluno(dados: {
  nome: string;
  classe_id: string;
}) {
  const { data, error } = await supabase
    .from("alunos")
    .insert(dados)
    .select();

  return { data, error };
}

// 🗑 deletar aluno (opcional mas já útil)
export async function deletarAluno(id: string) {
  const { data, error } = await supabase
    .from("alunos")
    .delete()
    .eq("id", id);

  return { data, error };
}