import AppShell from "../../components/layout/AppShell";

export const metadata = {
  title: "Sistema de Conhecimentos",
  description: "Cadastro de pessoas e conhecimentos",
};

export default function AppLayout({ children }) {
  return (
    <AppShell title={metadata.title} subtitle={metadata.description}>
      {children}
    </AppShell>
  );
}