"use client";

import Link from "next/link";

export default function Topbar() {
  return (
    <header className="topbar">
      {/* <div className="topbar-left">
        <div className="topbar-title">{title || "Dashboard"}</div>
        {subtitle ? <div className="topbar-subtitle">{subtitle}</div> : null}
      </div> */}

      <div className="topbar-actions">
        <Link className="btn btn-ghost" href="/pessoas/cadastro">
          + Pessoa
        </Link>
        <Link className="btn btn-primary" href="/conhecimentos/cadastro">
          + Conhecimento
        </Link>
      </div>
    </header>
  );
}