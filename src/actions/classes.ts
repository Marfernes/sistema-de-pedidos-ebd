"use server";

import { supabase } from "@/lib/supabase/client";

export async function criarClasse(dados: {
  nome: string;
  professor?: string;
}) {
  const { data, error } = await supabase
    .from("classes")
    .insert(dados)
    .select();

  return { data, error };
}

export async function buscarClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("id", { ascending: false });

  return { data, error };
}


export async function buscarClassePorId(id: string) {
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export async function listarClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select("id, nome")
    .order("nome");

  return { data, error };
}