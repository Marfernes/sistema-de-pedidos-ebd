import "./globals.css";

export const metadata = {
  title: "Sistema EBD",
  description: "Sistema de pedidos de revistas da Escola Bíblica Dominical",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}