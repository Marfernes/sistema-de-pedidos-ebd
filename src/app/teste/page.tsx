import { supabase } from "@/lib/supabase";

export default async function Teste() {
  const { data, error } = await supabase.from("congregacoes").select("*");

  return (
    <div>
      <h1>Teste Supabase</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}