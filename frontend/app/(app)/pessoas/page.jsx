"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getJSON, deleteJSON } from "../../../services/api";
import { LiaUserSolid, LiaEnvelopeSolid, LiaPhoneSolid } from "react-icons/lia";

export default function PagePessoas() {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const [q, setQ] = useState("");

    async function carregar() {
        try {
            setLoading(true);
            setErro(null);
            const data = await getJSON("pessoas");
            setItens(data);
        } catch (e) {
            setErro(e.message || "Erro ao carregar pessoas");
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

        return itens.filter((p) => {
            const nome = (p.pes_nome || "").toLowerCase();
            const email = (p.pes_email || "").toLowerCase();
            const login = (p.pes_login || "").toLowerCase();
            const telefone = (p.pes_telefone || "").toLowerCase();

            return (
                nome.includes(s) ||
                email.includes(s) ||
                login.includes(s) ||
                telefone.includes(s)
            );
        });
    }, [itens, q]);

    async function onDelete(id) {
        const ok = confirm("Tem certeza que deseja apagar esta pessoa?");
        if (!ok) return;

        try {
            await deleteJSON(`pessoas/${id}`);
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
                        <h1 className="form-title">Pessoas</h1>
                        <p className="form-subtitle">
                            Gerencie cadastros de pessoas.
                        </p>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: "14px" }}>
                    <div className="field" style={{ margin: 0 }}>
                        <label className="label">Pesquisar</label>
                        <input
                            className="input"
                            placeholder="Buscar por nome, email, login ou telefone..."
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
                        <div className="form-subtitle">
                            Nenhuma pessoa encontrada.
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Pessoa</th>
                                    <th style={{ width: 220 }}>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtrados.map((p) => (
                                    <tr key={p.pes_id}>
                                        <td>
                                            <div className="row-title">
                                                {p.pes_nome}
                                            </div>

                                            {p.pes_email && (
                                                <div className="row-subtitle">
                                                    <LiaEnvelopeSolid className="icon" />
                                                    {p.pes_email}
                                                </div>
                                            )}

                                            {p.pes_telefone && (
                                                <div className="row-subtitle">
                                                    <LiaPhoneSolid className="icon" />
                                                    {p.pes_telefone}
                                                </div>
                                            )}

                                            {p.pes_login && (
                                                <div className="row-subtitle">
                                                    Login: {p.pes_login}
                                                </div>
                                            )}
                                        </td>

                                        <td>
                                            <div className="row-actions">
                                                <Link
                                                    className="btn btn-ghost"
                                                    href={`/pessoas/${p.pes_id}`}
                                                >
                                                    Editar
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => onDelete(p.pes_id)}
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