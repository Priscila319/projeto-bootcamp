"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getJSON } from "../../../services/api";

export default function PageHome() {
  const [pessoas, setPessoas] = useState([]);
  const [conhecimentos, setConhecimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErro("");

        const [p, c] = await Promise.all([
          getJSON("pessoas"),
          getJSON("conhecimentos"),
        ]);

        if (!alive) return;

        setPessoas(Array.isArray(p) ? p : []);
        setConhecimentos(Array.isArray(c) ? c : []);
      } catch (e) {
        if (!alive) return;
        setErro(e?.message || "Falha ao carregar dashboard.");
        setPessoas([]);
        setConhecimentos([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, []);

  const totalPessoas = pessoas.length;
  const totalConhecimentos = conhecimentos.length;

  const inativos = useMemo(() => {
    return conhecimentos.filter((k) => k?.con_ativo === false).length;
  }, [conhecimentos]);

  const ultimos = useMemo(() => {
    return [...conhecimentos]
      .sort((a, b) => {
        const da = a?.con_criado_em ? new Date(a.con_criado_em).getTime() : 0;
        const db = b?.con_criado_em ? new Date(b.con_criado_em).getTime() : 0;
        if (db !== da) return db - da;
        return (b?.con_id || 0) - (a?.con_id || 0);
      })
      .slice(0, 5);
  }, [conhecimentos]);

  return (
    <div className="page">
      <div className="container">
        <h1 className="form-title">Dashboard</h1>
        <p className="form-subtitle">Visão geral do sistema</p>

        {loading && <p className="form-subtitle">Carregando…</p>}
        {!!erro && <p className="form-subtitle" style={{ color: "crimson" }}>{erro}</p>}

        {/* kpis */}
        <div className="stats">
          <div className="stat-card">
            <span className="stat-title">Pessoas</span>
            <span className="stat-value">{totalPessoas}</span>
          </div>

          <div className="stat-card">
            <span className="stat-title">Conhecimentos</span>
            <span className="stat-value">{totalConhecimentos}</span>
          </div>

          <div className="stat-card">
            <span className="stat-title">Inativos</span>
            <span className="stat-value">{inativos}</span>
          </div>
        </div>

        <div className="card dashboard-section">
          <div className="section-title">Últimos conhecimentos</div>

          <div className="list">
            {(!loading && ultimos.length === 0) ? (
              <div className="form-subtitle">Nenhum conhecimento cadastrado.</div>
            ) : (
              ultimos.map((k) => (
                <div className="list-item" key={k.con_id}>
                  <div>
                    <div className="list-item-title">{k.con_titulo}</div>
                    <div className="list-item-sub">{k?.pessoas?.pes_nome || "—"}</div>
                  </div>

                  <Link href={`/conhecimentos/${k.con_id}`} className="btn btn-ghost">
                    Abrir
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}