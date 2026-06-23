import { supabase } from "@/lib/supabase/client";

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error };

  // salva manualmente o token
  localStorage.setItem("token", data.session?.access_token ?? "");

  return { data };
}