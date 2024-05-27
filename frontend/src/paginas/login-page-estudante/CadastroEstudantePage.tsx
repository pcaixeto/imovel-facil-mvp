import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { criarClienteApi } from '../../api/cadastroClienteApi'; // Certifique-se de que o caminho está correto
import './cadastroEstudantePage.css';

const CadastroEstudantePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCliente: '',
    emailCliente: '',
    passwordCliente: '',
    tipoCliente: 2
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await criarClienteApi(formData);
      setSuccessMessage('Cliente cadastrado com sucesso!');
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('/login'); // Redireciona para a página de login após o cadastro
      }, 2000); // Exibe a mensagem por 2 segundos antes de redirecionar
    } catch (error) {
      console.error('Erro ao cadastrar estudante:', error);
      alert('Erro ao cadastrar o estudante. Por favor, tente novamente.');
    }
  };

  return (
    <div className="cadastro-container">
      <h1>Cadastro no IMÓVEL FÁCIL</h1>
      <div className="cadastro-forms">
        <div className="formulario-cadastro">
          <h2>Cadastro de Estudante</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nomeCliente">Nome:</label>
            <input
              type="text"
              id="nomeCliente"
              name="nomeCliente"
              value={formData.nomeCliente}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="emailCliente">E-mail:</label>
            <input
              type="email"
              id="emailCliente"
              name="emailCliente"
              value={formData.emailCliente}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="passwordCliente">Senha:</label>
            <input
              type="password"
              id="passwordCliente"
              name="passwordCliente"
              value={formData.passwordCliente}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      </div>
      <Link to="/login" className="cadastro-link">Voltar ao Login</Link>
    </div>
  );
}

export default CadastroEstudantePage;