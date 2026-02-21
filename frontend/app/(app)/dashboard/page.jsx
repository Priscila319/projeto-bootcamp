import Link from "next/link";
import { getJSON } from "../../../services/api";

export default async function PageHome() {
  const [pessoas, conhecimentos] = await Promise.all([
    getJSON("pessoas"),
    getJSON("conhecimentos"),
  ]);

  const totalPessoas = Array.isArray(pessoas) ? pessoas.length : 0;
  const totalConhecimentos = Array.isArray(conhecimentos) ? conhecimentos.length : 0;

  const inativos = Array.isArray(conhecimentos)
    ? conhecimentos.filter((k) => k.con_ativo === false).length
    : 0;

  const ultimos = Array.isArray(conhecimentos)
    ? [...conhecimentos]
      .sort((a, b) => {
        // tenta ordenar por data senao por id
        const da = a.con_criado_em ? new Date(a.con_criado_em).getTime() : 0;
        const db = b.con_criado_em ? new Date(b.con_criado_em).getTime() : 0;
        if (db !== da) return db - da;
        return (b.con_id || 0) - (a.con_id || 0);
      })
      .slice(0, 5)
    : [];

  return (
    <div className="page">
      <div className="container">
        <h1 className="form-title">Dashboard</h1>
        <p className="form-subtitle">Visão geral do sistema</p>

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
            {ultimos.length === 0 ? (
              <div className="form-subtitle">Nenhum conhecimento cadastrado.</div>
            ) : (
              ultimos.map((k) => (
                <div className="list-item" key={k.con_id}>
                  <div>
                    <div className="list-item-title">{k.con_titulo}</div>
                    <div className="list-item-sub">
                      {k.pessoas?.pes_nome || "—"}
                    </div>
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