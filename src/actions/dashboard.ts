"use server";

import { createClient } from "@supabase/supabase-js";
import { precosRevistas } from "@/config/precosRevistas";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type TipoRevista = "aluno" | "professor" | "capa_dura";
type ClasseKey = keyof typeof precosRevistas;

/**
 * Normaliza tipo da revista
 */
function normalizarTipo(tipo: string): TipoRevista | null {
  const t = (tipo || "").toLowerCase().replace(/\s/g, "");

  if (t.includes("aluno")) return "aluno";
  if (t.includes("professor") && t.includes("capa")) return "capa_dura";
  if (t.includes("capa")) return "capa_dura";
  if (t.includes("professor")) return "professor";

  return null;
}

/**
 * 🔥 MAPEAMENTO FORÇADO (EVITA ERRO DE STRING)
 */
function normalizarClasse(nome: string): ClasseKey | null {
  const n = (nome || "").toLowerCase();

  if (n.includes("pequenos")) return "pequenos_do_rei";
  if (n.includes("adoradores")) return "adoradores_de_cristo";
  if (n.includes("juvenis")) return "juvenis";
  if (n.includes("hero")) return "heroinas_da_fe";
  if (n.includes("remidos")) return "remidos_por_cristo";
  if (n.includes("cristo")) return "cristo_vive";

  return null;
}

export async function buscarResumoDashboard() {
  const { data, error } = await supabase
    .from("pedidos_publicos")
    .select("tipo_revista, status_pagamento, classe_id");

  if (error || !data) return { error };

  const { data: classesData } = await supabase
    .from("classes")
    .select("id, nome");

  const mapClasses = new Map(
    classesData?.map((c) => [c.id, c.nome]) || []
  );

  const resumo = {
    total_pedidos: 0,
    total_pagos: 0,
    total_pendentes: 0,
    total_arrecadado: 0,
    por_tipo: {
      aluno: 0,
      professor: 0,
      capa_dura: 0,
    },
  };

  for (const item of data) {
    resumo.total_pedidos++;

    const tipo = normalizarTipo(item.tipo_revista);
    if (!tipo) continue;

    resumo.por_tipo[tipo]++;

    const nomeClasse = mapClasses.get(item.classe_id || "");
    const classeKey = nomeClasse ? normalizarClasse(nomeClasse) : null;

    if (item.status_pagamento === "pago") {
      resumo.total_pagos++;

      if (classeKey) {
        const valor =
          precosRevistas[classeKey]?.[tipo] ?? 0;

        resumo.total_arrecadado += valor;
      }
    }

    if (item.status_pagamento === "pendente") {
      resumo.total_pendentes++;
    }
  }

  return { data: resumo };
}