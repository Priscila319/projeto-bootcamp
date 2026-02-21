import "../globals.css";
import AppShell from "../../components/layout/AppShell";

export const metadata = {
  title: "Sistema de Conhecimentos",
  description: "Cadastro de pessoas e conhecimentos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell title={metadata.title} subtitle={metadata.description}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}