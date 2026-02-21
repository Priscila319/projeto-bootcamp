import Link from "next/link";

export default function PageHome() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="form-title">Dashboard</h1>
        <p className="form-subtitle">Visão geral do sistema</p>

        <div className="quick-actions">
          <Link href="/pessoas/cadastro" className="btn btn-primary">
            Nova Pessoa
          </Link>

          <Link href="/conhecimentos/cadastro" className="btn btn-primary">
            Novo Conhecimento
          </Link>
        </div>

        {/* kpis */}
        <div className="stats">
          <div className="stat-card">
            <span className="stat-title">Pessoas</span>
            <span className="stat-value">42</span>
          </div>

          <div className="stat-card">
            <span className="stat-title">Conhecimentos</span>
            <span className="stat-value">120</span>
          </div>

          <div className="stat-card">
            <span className="stat-title">Inativos</span>
            <span className="stat-value">8</span>
          </div>
        </div>

        <div className="card dashboard-section">
          <div className="section-title">Últimos conhecimentos</div>

          <div className="list">
            <div className="list-item">
              <div>
                <div className="list-item-title">HTML Básico</div>
                <div className="list-item-sub">Marcos</div>
              </div>

              <Link href="/conhecimentos/1" className="btn btn-ghost">
                Abrir
              </Link>
            </div>

            <div className="list-item">
              <div>
                <div className="list-item-title">SQL</div>
                <div className="list-item-sub">Ana</div>
              </div>

              <Link href="/conhecimentos/2" className="btn btn-ghost">
                Abrir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}