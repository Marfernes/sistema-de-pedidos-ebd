import { createSupabaseServer } from "@/lib/supabase-server";

export async function buscarAlunos() {
  const supabase = await createSupabaseServer();

  return supabase.from("alunos").select("*, classes(nome)");
}

export async function criarAluno(dados: any) {
  const supabase = await createSupabaseServer();

  return supabase.from("alunos").insert(dados);
}