"use client";
import { Router } from "next/router";
import { postJSON } from "../../services/api";

import Link from "next/link";

export default function Topbar() {
  const router = Router();
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
      <div className="topbar-handle">
        <button className="btn btn-logout" onClick={handleLogout}>Sair</button>
      </div>
    </header>
  );
}