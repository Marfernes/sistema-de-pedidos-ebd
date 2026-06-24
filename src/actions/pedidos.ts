"use server";

import { supabase } from "@/lib/supabase/client";

export async function listarPedidos() {
  const { data, error } = await supabase
    .from("pedidos_publicos")
    .select(`
      id,
      nome,
      telefone,
      tipo_revista,
      classe_id,
       classes (
      nome
    ),
      status_pagamento,
      created_at
    `)
    .order("created_at", { ascending: false });

  return { data, error };
}

