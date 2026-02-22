"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getJSON, deleteJSON } from "../../../services/api";
import { LiaChalkboardTeacherSolid, LiaFileAltSolid } from "react-icons/lia";

export default function PageConhecimentos() {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [q, setQ] = useState("");

    async function carregar() {
        try {
            setLoading(true);
            setErro(null);
            const data = await getJSON("conhecimentos");
            setItens(data);
        } catch (e) {
            setErro(e.message || "Erro ao carregar conhecimentos");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregar();
    }, []);

    const filtrados = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return itens;

        return itens.filter((k) => {
            const titulo = (k.con_titulo || "").toLowerCase();
            const descricao = (k.con_descricao || "").toLowerCase();
            const autor = (k.pessoas?.pes_nome || "").toLowerCase();
            return titulo.includes(s) || descricao.includes(s) || autor.includes(s);
        });
    }, [itens, q]);

    async function onDelete(id) {
        const ok = confirm("Tem certeza que deseja apagar este conhecimento?");
        if (!ok) return;

        try {
            await deleteJSON(`conhecimentos/${id}`);
            await carregar();
        } catch (e) {
            alert(e.message || "Erro ao apagar");
        }
    }

    return (
        <div className="page">
            <div className="container">

                <div className="list-header">
                    <div>
                        <h1 className="form-title">Conhecimentos</h1>
                        <p className="form-subtitle">Gerencie cadastros: pesquise, edite e inative/apague.</p>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: "14px" }}>
                    <div className="field" style={{ margin: 0 }}>
                        <label className="label">Pesquisar</label>
                        <input
                            className="input"
                            placeholder="Buscar por título, descrição ou autor..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                </div>

                <div className="card">
                    {erro && <div className="alert alert-error">{erro}</div>}

                    {loading ? (
                        <div className="form-subtitle">Carregando...</div>
                    ) : filtrados.length === 0 ? (
                        <div className="form-subtitle">Nenhum conhecimento encontrado.</div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Status</th>
                                    <th style={{ width: 220 }}>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtrados.map((k) => (
                                    <tr key={k.con_id}>
                                        <td>
                                            <div className="row-title">{k.con_titulo}</div>

                                            {k.pessoas?.pes_nome && (
                                                <div className="row-subtitle">
                                                    <LiaChalkboardTeacherSolid className="icon" />
                                                    {k.pessoas.pes_nome}
                                                </div>
                                            )}

                                            {k.con_descricao && (
                                                <div className="row-subtitle">
                                                    <LiaFileAltSolid className="icon" />
                                                    {k.con_descricao}
                                                </div>
                                            )}
                                        </td>

                                        <td>
                                            <span className={`badge ${k.con_ativo ? "badge-ok" : "badge-off"}`}>
                                                {k.con_ativo ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="row-actions">
                                                <Link className="btn btn-ghost" href={`/conhecimentos/${k.con_id}`}>
                                                    Editar
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => onDelete(k.con_id)}
                                                >
                                                    Apagar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

            </div>
        </div>
    );
}