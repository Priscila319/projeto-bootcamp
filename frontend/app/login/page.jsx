"use client";
import { useForm } from "react-hook-form";
import { FormCard } from "../../components/cadastro/FormCard";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Lógica de autenticação aqui
    console.log("Login data:", data);
  };
  return (
    <FormCard title={"Autenticação"}>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Login</label>
          <input
            className={`input ${errors.login ? "input-error" : ""}`}
            placeholder="Digite seu login"
            {...register("login", { required: "Login é obrigatório" })}
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
            placeholder="Digite sua senha"
            {...register("senha", { required: "Senha é obrigatória" })}
          />

          {errors.senha && (
            <span className="error-text">{errors.senha.message}</span>
          )}
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
        </div>

        <div className="field">
          <p className="subtitle">
            Não tem uma conta? <a href="/login/cadastro" className="link">Cadastre-se</a>
          </p>
        </div>
      </form>
    </FormCard>
  );
}