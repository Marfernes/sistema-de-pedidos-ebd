import { precosRevistas } from "@/config/precosRevistas";

export function calcularValorPedido(classe: string, tipo: string) {
  const classeKey = classe.toLowerCase().replace(/ /g, "_");
  const tipoKey = tipo.toLowerCase().replace(/ /g, "_");

  const grupo = precosRevistas[classeKey as keyof typeof precosRevistas];

  if (!grupo) return 0;

  return grupo[tipoKey as keyof typeof grupo] || 0;
}