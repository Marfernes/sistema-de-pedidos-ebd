"use server";

import { supabase } from "@/lib/supabase/client";

export async function criarPedido(dados: {
  nome: string;
  telefone?: string;
  classe_id: string;
  tipo_revista: string;
}) {
  const { data, error } = await supabase
    .from("pedidos_publicos")
    .insert(dados)
    .select();

  return { data, error };
}

export async function marcarComoPago(id: string) {
  const { data, error } = await supabase
    .from("pedidos_publicos")
    .update({ status_pagamento: "pago" })
    .eq("id", id)
    .select();

  return { data, error };
}