"use client";
import { useForm } from "react-hook-form";
import { FormCard } from "../../../components/cadastro/FormCard";
import { formatarTelefone } from "../../../utils/formatters";
import { postJSON } from "../../../services/api";
import { useState } from "react";
export default function CadastroPessoaPage() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [sucesso, setSucesso] = useState(false);
    const [erroApi, setErroApi] = useState(null);

    const telefoneReg = register("telefone", {
        required: "Telefone obrigatório",
        validate: (v) => {
            const digits = (v || "").replace(/\D/g, "");
            if (digits.length === 10 || digits.length === 11) return true;
            return "Telefone incompleto";
        },
    });

    const onSubmit = (data) => {
        try {
            postJSON("pessoas", data);

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
        <FormCard title={"Cadastro de Pessoa"}>
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
                        placeholder="Crie uma senha segura"
                        {...register("senha", { required: "Senha é obrigatória", minLength: { value: 6, message: "Mín. 6 caracteres" } })}
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

                <div className="form-actions">
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                        Enviar
                    </button>
                </div>
            </form>
        </FormCard>
    );
}