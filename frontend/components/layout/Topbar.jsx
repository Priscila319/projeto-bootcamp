"use client";
import { useRouter } from "next/navigation";
import { postJSON } from "../../services/api";

import Link from "next/link";

export default function Topbar() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await postJSON("auth/logout");
      router.replace("/login");
    } catch (error) {
      alert(error.message || "Erro ao sair");
    }
  };
  return (
    <header className="topbar">
      <div className="topbar-actions">
        <Link className="btn btn-ghost" href="/pessoas/cadastro">
          + Pessoa
        </Link>
        <Link className="btn btn-primary" href="/conhecimentos/cadastro">
          + Conhecimento
        </Link>
      </div>
      <div className="topbar-left">
        <Link className="btn btn-logout" href="#" onClick={handleLogout}>Sair</Link>
      </div>
    </header>
  );
}