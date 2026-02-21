"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormCard } from "../../components/cadastro/FormCard";
import { ToggleSwitch } from "../../components/cadastro/ToggleSwitch";
import { getJSON, postJSON, putJSON } from "@/services/api";

export default function CadastroConhecimentoForm({ conhecimentoId }) {
  const isEdit = Boolean(conhecimentoId);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } =
    useForm({ defaultValues: { ativo: true } });

  const ativo = watch("ativo");
  const canEditFields = !isEdit || ativo === true;

  const [erroApi, setErroApi] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const [pessoas, setPessoas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [niveis, setNiveis] = useState([]);

  const [loadingListas, setLoadingListas] = useState(true);

  useEffect(() => {
    let alive = true;

    async function carregar() {
      try {
        setLoadingListas(true);
        setErroApi(null);

        const [p, c, n] = await Promise.all([
          getJSON("pessoas"),
          getJSON("categorias"),
          getJSON("niveis"),
        ]);

        if (!alive) return;
        setPessoas(p);
        setCategorias(c);
        setNiveis(n);

        if (isEdit) {
          const k = await getJSON(`conhecimentos/${conhecimentoId}`);
          if (!alive) return;

          reset({
            pessoaId: k.con_pessoa_id,
            categoriaId: k.con_categoria_id,
            nivelId: k.con_nivel_id,
            titulo: k.con_titulo,
            descricao: k.con_descricao,
            ativo: k.con_ativo,
          });
        }
      } catch (e) {
        if (!alive) return;
        setErroApi(e.message || "Erro ao carregar");
      } finally {
        if (!alive) return;
        setLoadingListas(false);
      }
    }

    carregar();
    return () => { alive = false; };
  }, [isEdit, conhecimentoId, reset]);

  const onSubmit = async (data) => {
    try {
      setErroApi(null);

      if (isEdit) {
        await putJSON(`conhecimentos/${conhecimentoId}`, data);
      } else {
        await postJSON("conhecimentos", data);
        reset({ ativo: true });
      }

      setSucesso(true);
      setTimeout(() => setSucesso(false), 2000);
    } catch (e) {
      setErroApi(e.message || "Erro ao salvar");
    }
  };

  return (
    <FormCard
      title={isEdit ? "Editar Conhecimento" : "Cadastro de Conhecimento"}
      backHref="/conhecimentos"
    >
      <form className="form" onSubmit={handleSubmit(onSubmit)}>

        {isEdit && (
          <div className="field">
            <ToggleSwitch
              id="ativo"
              label={ativo ? "Ativo" : "Inativo"}
              checked={!!ativo}
              onChange={(v) => setValue("ativo", v, { shouldDirty: true })}
            />
          </div>
        )}

        <div className="field">
          <label className="label">Pessoa</label>
          <select
            className={`select ${errors.pessoaId ? "select-error" : ""}`}
            disabled={loadingListas || !canEditFields}
            defaultValue=""
            {...register("pessoaId", { required: "Pessoa é obrigatória" })}
          >
            <option value="" disabled>{loadingListas ? "Carregando..." : "Selecione uma pessoa"}</option>
            {pessoas.map((p) => (
              <option key={p.pes_id} value={p.pes_id}>{p.pes_nome}</option>
            ))}
          </select>
          {errors.pessoaId && <span className="error-text">{errors.pessoaId.message}</span>}
        </div>

        <div className="field">
          <label className="label">Título</label>
          <input
            className={`input ${errors.titulo ? "input-error" : ""}`}
            placeholder="Título do conhecimento"
            disabled={!canEditFields}
            {...register("titulo", { required: "Título é obrigatório", maxLength: { value: 150, message: "Máx. 150 caracteres" } })}
          />
          {errors.titulo && <span className="error-text">{errors.titulo.message}</span>}
        </div>

        <div className="field">
          <label className="label">Categoria</label>
          <select
            className={`select ${errors.categoriaId ? "select-error" : ""}`}
            disabled={loadingListas || !canEditFields}
            defaultValue=""
            {...register("categoriaId", { required: "Categoria é obrigatória" })}
          >
            <option value="" disabled>{loadingListas ? "Carregando..." : "Selecione uma categoria"}</option>
            {categorias.map((c) => (
              <option key={c.cat_id} value={c.cat_id}>{c.cat_nome}</option>
            ))}
          </select>
          {errors.categoriaId && <span className="error-text">{errors.categoriaId.message}</span>}
        </div>

        <div className="field">
          <label className="label">Nível</label>
          <select
            className={`select ${errors.nivelId ? "select-error" : ""}`}
            disabled={loadingListas || !canEditFields}
            defaultValue=""
            {...register("nivelId", { required: "Nível é obrigatório" })}
          >
            <option value="" disabled>{loadingListas ? "Carregando..." : "Selecione um nível"}</option>
            {niveis.map((n) => (
              <option key={n.niv_id} value={n.niv_id}>{n.niv_nome}</option>
            ))}
          </select>
          {errors.nivelId && <span className="error-text">{errors.nivelId.message}</span>}
        </div>

        <div className="field">
          <label className="label">Descrição</label>
          <textarea
            className={`textarea ${errors.descricao ? "textarea-error" : ""}`}
            placeholder="Descrição do conhecimento"
            disabled={!canEditFields}
            {...register("descricao", { required: "Descrição é obrigatória", maxLength: { value: 250, message: "Máx. 250 caracteres" } })}
          />
          {errors.descricao && <span className="error-text">{errors.descricao.message}</span>}
        </div>

        {isEdit && ativo === false && (
          <div className="alert alert-error">
            Este conhecimento está inativo. Reative para editar os campos. Você ainda pode clicar em Atualizar para salvar o status.
          </div>
        )}

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isEdit ? "Atualizar" : "Enviar"}
        </button>

        {sucesso && <div className="alert alert-success">Salvo com sucesso!</div>}
        {erroApi && <div className="alert alert-error">{erroApi}</div>}
      </form>
    </FormCard>
  );
}