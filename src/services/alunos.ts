import { supabase } from "@/lib/supabase/client";

export async function buscarAlunos() {
  return await supabase
    .from("alunos")
    .select("*, classes(nome)");
}

export async function criarAluno(dados: any) {
  return await supabase
    .from("alunos")
    .insert(dados);
}