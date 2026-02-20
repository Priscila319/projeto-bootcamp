"use client";
import { useForm } from "react-hook-form";
import { FormCard } from "../../../components/cadastro/FormCard";
import { formatarTelefone } from "../../../utils/formatters";

export default function CadastroPessoaPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = (data) => console.log(data);

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
                        placeholder="(46) 91234-5678"

                        {...register("telefone", {
                            required: "Telefone obrigatório",
                            minLength: { value: 14, message: "Telefone incompleto" }
                        })}

                        onChange={(e) => {
                            e.target.value = formatarTelefone(e.target.value);
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
                        placeholder="Seu login"
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
                        placeholder="Sua senha"
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

                <div className="form-actions">
                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                        Enviar
                    </button>
                </div>
            </form>
        </FormCard>
    );
}