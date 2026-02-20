import Link from "next/link";

export default async function PageConhecimentos() {
    return (
        <div>
            <h1>Página Conhecimentos</h1>
            {
                conhecimentos.map((k) => (
                    <div key={k.con_id} className="card">
                        <div>{k.con_titulo}</div>
                        <Link className="btn btn-primary" href={`/conhecimento/${k.con_id}`}>
                            Editar
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}