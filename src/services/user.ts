export async function getUser() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}