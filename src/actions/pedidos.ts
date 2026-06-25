import { supabase } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";

export async function listarPedidos(page: number, pageSize: number) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("pedidos_publicos")
    .select(
      `
      id,
      nome,
      telefone,
      tipo_revista,
      classe_id,
      classes ( nome ),
      status_pagamento,
      created_at
      `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  return {
    data: (data ?? []) as any[], // 👈 aqui resolve o erro de tipagem
    error,
    total: count ?? 0,
  };
}

export async function listarTodosPedidos() {
  const { data, error } = await supabase
    .from("pedidos_publicos")
    .select(`
      id,
      nome,
      telefone,
      tipo_revista,
      status_pagamento,
      created_at,
      classe_id,
      classes (
        nome
      )
    `)
    .order("created_at", { ascending: false });

  return { data, error };
}