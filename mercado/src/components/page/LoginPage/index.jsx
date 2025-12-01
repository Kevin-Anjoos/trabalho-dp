// C:\Users\aluno.den\Downloads\mercado\src\components\page\LoginPage\index.jsx

import './style.css'
import { useForm } from "react-hook-form"

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../../services/api";

const esquemaDeLogin = yup.object({
  email: yup
    .string()
    .required("O e-mail é obrigatório.")
    .email("Formato de e-mail inválido."),
  senha: yup
    .string()
    .required("A senha é obrigatória.")
    .min(3, "A senha deve ter pelo menos 3 caracteres."),
});

function PaginaDeLogin() {
  const {
    register: registrarCampo,
    handleSubmit: lidarComEnvioDoFormulario,
    formState: { errors: errosDoFormulario, isSubmitting: estaEnviando },
    setError: definirErroNoCampo,
    reset: limparCamposDoFormulario,
  } = useForm({
    resolver: yupResolver(esquemaDeLogin),
    defaultValues: { email: "", senha: "" },
  });

  async function enviarDados(dadosDoFormulario) {
    const dadosParaApi = {
      email: dadosDoFormulario.email,
      senha: dadosDoFormulario.senha,
    };

    try {
      const resposta = await login(dadosParaApi);
      const data = resposta.data;
      if (data?.token) {
        localStorage.setItem('token', data.token);
        alert(data.message || 'Login realizado com sucesso');
        limparCamposDoFormulario();
      } else {
        alert('Resposta inesperada do servidor')
      }
    } catch (erro) {
      const codigoDeStatus = erro?.response?.status;
      const mensagemDoServidor =
        erro?.response?.data || "Erro ao fazer login.";

      if (codigoDeStatus === 401) {
        definirErroNoCampo("email", {
          type: "server",
          message: mensagemDoServidor,
        });
      }

      alert(mensagemDoServidor);
      console.error("Erro no login:", erro);
    }
  }

  return (
    <div className="cadastro-container">
      <h1>Entrar</h1>

      <form noValidate onSubmit={lidarComEnvioDoFormulario(enviarDados)}>
        {/* E-mail */}
        <div className="form-group">
          <label htmlFor="campo-email">E-mail</label>
          <input
            id="campo-email"
            type="email"
            placeholder="exemplo@dominio.com"
            {...registrarCampo("email")}
          />
        </div>
        {errosDoFormulario.email && (
          <p className="error-message">{errosDoFormulario.email.message}</p>
        )}

        {/* Senha */}
        <div className="form-group">
          <label htmlFor="campo-senha">Senha</label>
          <input
            id="campo-senha"
            type="password"
            placeholder="Sua senha"
            {...registrarCampo("senha")}
          />
        </div>
        {errosDoFormulario.senha && (
          <p className="error-message">{errosDoFormulario.senha.message}</p>
        )}

        <button type="submit" disabled={estaEnviando}>
          {estaEnviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default PaginaDeLogin