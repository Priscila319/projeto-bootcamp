"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormCard } from "../cadastro/FormCard";
import { getJSON, postJSON, putJSON } from "../../services/api";
import { formatarTelefone } from "../../utils/formatters";


export default function CadastroPessoaForm({ pessoaId }) {
  const isEdit = Boolean(pessoaId);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } =
    useForm();

  const [erroApi, setErroApi] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  const [pessoas, setPessoas] = useState([]);

  const [loadingListas, setLoadingListas] = useState(true);

  const telefoneReg = register("telefone", {
    required: "Telefone obrigatório",
    validate: (v) => {
      const digits = (v || "").replace(/\D/g, "");
      if (digits.length === 10 || digits.length === 11) return true;
      return "Telefone incompleto";
    },
  });

  useEffect(() => {
    let alive = true;

    async function carregar() {
      try {
        setLoadingListas(true);
        setErroApi(null);

        const [p] = await Promise.all([
          getJSON("pessoas"),
        ]);

        if (!alive) return;
        setPessoas(p);

        if (isEdit) {
          const k = await getJSON(`pessoas/${pessoaId}`);
          if (!alive) return;

          reset({
            pessoaId: k.pes_id,
            nome: k.pes_nome,
            email: k.pes_email,
            telefone: k.pes_telefone,
            descricao: k.pes_descricao,
            login: k.pes_login,
            senha: "",
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
  }, [isEdit, pessoaId, reset]);

  const onSubmit = async (data) => {
    try {
      setErroApi(null);

      const payload = { ...data };
      if (isEdit && (!payload.senha || payload.senha.trim() === "")) {
        delete payload.senha;
      }

      if (isEdit) {
        await putJSON(`pessoas/${pessoaId}`, payload);
      } else {
        await postJSON("pessoas", payload);
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
      title={isEdit ? "Editar Pessoa" : "Cadastro de Pessoa"}
      backHref="/pessoas"
    >
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nome Completo</label>
          <input
            className={`input ${errors.nome ? "input-error" : ""}`}
            placeholder="Seu nome completo"
            {...register("nome", { required: "Nome é obrigatório", maxLength: { value: 100, message: "Máx. 100 caracteres" } })}
          />
          {errors.nome && (
            <span className="error-text">{errors.nome.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">E-mail</label>
          <input
            className={`input ${errors.email ? "input-error" : ""}`}
            placeholder="Ex: seuemail@exemplo.com"
            {...register("email", { required: "E-mail é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "E-mail inválido" } })}
          />
          {errors.email && (
            <span className="error-text">{errors.email.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">Telefone</label>

          <input
            className={`input ${errors.telefone ? "input-error" : ""}`}
            type="tel"
            inputMode="numeric"
            placeholder="Ex: (99) 99999-9999"
            {...telefoneReg}
            onChange={(e) => {
              const masked = formatarTelefone(e.target.value);
              e.target.value = masked;
              telefoneReg.onChange(e);
            }}
          />

          {errors.telefone && (
            <span className="error-text">{errors.telefone.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">Login</label>
          <input
            className={`input ${errors.login ? "input-error" : ""}`}
            placeholder="Crie um login único"
            {...register("login", { required: "Login é obrigatório", maxLength: { value: 50, message: "Máx. 50 caracteres" } })}
          />
          {errors.login && (
            <span className="error-text">{errors.login.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">Senha</label>
          <input
            className={`input ${errors.senha ? "input-error" : ""}`}
            type="password"
            placeholder={isEdit ? "Deixe em branco para manter a senha atual" : "Crie uma senha"}
            {...register("senha", { required: isEdit ? false : "Senha é obrigatória", minLength: { value: 6, message: "Mín. 6 caracteres" } })}
          />
          {errors.senha && (
            <span className="error-text">{errors.senha.message}</span>
          )}
        </div>

        <div className="field">
          <label className="label">Descrição</label>
          <textarea
            className={`textarea ${errors.descricao ? "textarea-error" : ""}`}
            placeholder="Descreva a pessoa"
            {...register("descricao", { maxLength: { value: 255, message: "Máx. 255 caracteres" } })}
          />
          {errors.descricao && (
            <span className="error-text">{errors.descricao.message}</span>
          )}
        </div>

        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
          {isEdit ? "Atualizar" : "Enviar"}
        </button>
        {sucesso && (
          <div className="alert alert-success">
            {isEdit ? "Atualizado com sucesso!" : "Cadastro realizado com sucesso!"}
          </div>
        )}
        {erroApi && <div className="alert alert-error">{erroApi}</div>}
      </form>
    </FormCard >
  );
}