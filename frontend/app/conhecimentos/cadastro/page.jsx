"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormCard } from "../../../components/cadastro/FormCard";
import { postJSON, getJSON } from "../../../services/api";

export default function CadastroConhecimentoPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const [sucesso, setSucesso] = useState(false);
    const [erroApi, setErroApi] = useState(null);

    const [pessoas, setPessoas] = useState([]);
    const [pessoasLoading, setPessoasLoading] = useState(true);
    const [pessoasErro, setPessoasErro] = useState(null);

    const [categorias, setCategorias] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [catErro, setCatErro] = useState(null);

    const [niveis, setNiveis] = useState([]);
    const [nivelLoading, setNivelLoading] = useState(true);
    const [nivelErro, setNivelErro] = useState(null);



    useEffect(() => {
        let alive = true;

        async function carregarTudo() {
            try {
                setPessoasLoading(true);
                setCatLoading(true);
                setNivelLoading(true);
                setPessoasErro(null);
                setCatErro(null);
                setNivelErro(null);

                const [p, c, n] = await Promise.all([
                    getJSON("pessoas"),
                    getJSON("categorias"),
                    getJSON("niveis"),
                ]);

                if (!alive) return;

                setPessoas(p);
                setCategorias(c);
                setNiveis(n);
            } catch (e) {
                if (!alive) return;
                const msg = e.message || "Erro ao carregar dados";
                setPessoasErro(msg);
                setCatErro(msg);
                setNivelErro(msg);
            } finally {
                if (!alive) return;
                setPessoasLoading(false);
                setCatLoading(false);
                setNivelLoading(false);
            }
        }

        carregarTudo();
        return () => { alive = false; };
    }, []);

    const onSubmit = async (data) => {
        try {
            await postJSON("conhecimentos", data);

            setSucesso(true);
            setErroApi(null);

            reset(); // limpa os campos do form

            setTimeout(() => setSucesso(false), 3000);
        } catch (error) {
            setErroApi(error.message || "Erro ao cadastrar pessoa");
            setSucesso(false);
        }
    };

    return (
        <FormCard title={"Cadastro de Conhecimento"}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Pessoa</label>

                    <select
                        className={`select ${errors.pessoaId ? "select-error" : ""}`}
                        disabled={pessoasLoading}
                        defaultValue=""
                        {...register("pessoaId", { required: "Pessoa é obrigatória" })}
                    >
                        <option value="" disabled>
                            {pessoasLoading ? "Carregando..." : "Selecione uma pessoa"}
                        </option>

                        {pessoas.map((p) => (
                            <option key={p.pes_id} value={p.pes_id}>
                                {p.pes_nome}
                            </option>
                        ))}
                    </select>

                    {pessoasErro && <span className="error-text">{pessoasErro}</span>}
                    {errors.pessoaId && <span className="error-text">{errors.pessoaId.message}</span>}
                </div>
                <div className="field">
                    <label className="label">Título</label>
                    <input
                        className={`input ${errors.titulo ? "input-error" : ""}`}
                        placeholder="Título do conhecimento"
                        {...register("titulo", { required: "Título é obrigatório", maxLength: { value: 150, message: "Máx. 150 caracteres" } })}
                    />
                </div>
                <div className="field">
                    <label className="label">Categoria</label>

                    <select
                        className={`select ${errors.categoriaId ? "select-error" : ""}`}
                        disabled={catLoading}
                        defaultValue=""
                        {...register("categoriaId", { required: "Categoria é obrigatória" })}
                    >
                        <option value="" disabled>
                            {catLoading ? "Carregando..." : "Selecione uma categoria"}
                        </option>

                        {categorias.map((c) => (
                            <option key={c.cat_id} value={c.cat_id}>
                                {c.cat_nome}
                            </option>
                        ))}
                    </select>

                    {catErro && <span className="error-text">{catErro}</span>}
                    {errors.categoriaId && <span className="error-text">{errors.categoriaId.message}</span>}
                </div>

                <div className="field">
                    <label className="label">Nível</label>

                    <select
                        className={`select ${errors.nivelId ? "select-error" : ""}`}
                        disabled={nivelLoading}
                        defaultValue=""
                        {...register("nivelId", { required: "Nível é obrigatório" })}
                    >
                        <option value="" disabled>
                            {nivelLoading ? "Carregando..." : "Selecione um nível"}
                        </option>

                        {niveis.map((n) => (
                            <option key={n.niv_id} value={n.niv_id}>
                                {n.niv_nome}
                            </option>
                        ))}
                    </select>

                    {nivelErro && <span className="error-text">{nivelErro}</span>}
                    {errors.nivelId && <span className="error-text">{errors.nivelId.message}</span>}
                </div>

                <div className="field">
                    <label className="label">Descrição</label>
                    <textarea
                        className={`textarea ${errors.descricao ? "textarea-error" : ""}`}
                        placeholder="Descrição do conhecimento"
                        {...register("descricao", { required: "Descrição é obrigatória", maxLength: { value: 500, message: "Máx. 500 caracteres" } })}
                    />
                </div>

                {sucesso && (
                    <div className="alert alert-success">
                        Cadastro realizado com sucesso!
                    </div>
                )}

                {erroApi && (
                    <div className="alert alert-error">
                        {erroApi}
                    </div>
                )}
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    Enviar
                </button>
            </form>
        </FormCard>
    );
}