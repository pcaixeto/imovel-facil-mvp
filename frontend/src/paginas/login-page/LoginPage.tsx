/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginApi } from '../../api/loginClienteApi'; // Certifique-se de que o caminho está correto
import './loginPage.css';

interface LoginPageProps {
  onLogin: (userData: { email: string; tipoCliente: number; idCliente: number, nomeCliente: string }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  
  // Estado separado para o formulário de estudante
  const [studentFormData, setStudentFormData] = useState({
    email: '',
    password: ''
  });

  // Estado separado para o formulário de anunciante
  const [anuncianteFormData, setAnuncianteFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, formType: 'student' | 'anunciante') => {
    const { name, value } = event.target;
    
    if (formType === 'student') {
      setStudentFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setAnuncianteFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent, formType: 'student' | 'anunciante') => {
    event.preventDefault();
    try {
      const formData = formType === 'student' ? studentFormData : anuncianteFormData;
      const tipoCliente = formType === 'student' ? 2 : 1; // Assume these values match your backend logic
      const response = await loginApi(formData.email, formData.password, tipoCliente);
      
      // Extraímos o idTipoCliente do objeto tipoCliente retornado pelo backend
      const user = {
        email: response.emailCliente,
        tipoCliente: response.tipoCliente.idTipoCliente,
        idCliente: response.idCliente,
        nomeCliente: response.nomeCliente
      };
  
      console.log('Authenticated user:', user);
      setErrorMessage(null);
      onLogin(user);
      navigate('/home', { state: { user } });  // Passe o user como state
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage((error as Error).message);
    }
  };

  const showAlert = () => {
    alert("NÃO IMPLEMENTADO NO MVP.");
  };

  return (
    <div className="loginPage-container">
      <h1>Seja bem-vindo ao sistema IMÓVEL FÁCIL</h1>
      <div className="loginPage-forms">
        <div className="loginPage-formulario-login">
          <h2>Login do Estudante</h2>
          <form onSubmit={(event) => handleSubmit(event, 'student')}>
            <label htmlFor="email-estudante">E-mail:</label>
            <input
              type="email"
              id="email-estudante"
              name="email"
              value={studentFormData.email}
              onChange={(event) => handleInputChange(event, 'student')}
              required
            />
            <label htmlFor="password-estudante">Senha:</label>
            <input
              type="password"
              id="password-estudante"
              name="password"
              value={studentFormData.password}
              onChange={(event) => handleInputChange(event, 'student')}
              required
            />
            <button type="submit">Entrar</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="loginPage-links-container">
              <a href="#" onClick={(e) => { e.preventDefault(); showAlert(); }}>Esqueci minha Senha</a>
              <Link to="/cadastro-estudante">Novo Cadastro</Link>
            </div>
          </form>
        </div>
        <div className="loginPage-formulario-login">
          <h2>Login do Anunciante</h2>
          <form onSubmit={(event) => handleSubmit(event, 'anunciante')}>
            <label htmlFor="email-anunciante">E-mail:</label>
            <input
              type="email"
              id="email-anunciante"
              name="email"
              value={anuncianteFormData.email}
              onChange={(event) => handleInputChange(event, 'anunciante')}
              required
            />
            <label htmlFor="password-anunciante">Senha:</label>
            <input
              type="password"
              id="password-anunciante"
              name="password"
              value={anuncianteFormData.password}
              onChange={(event) => handleInputChange(event, 'anunciante')}
              required
            />
            <button type="submit">Entrar</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="loginPage-links-container">
              <a href="#" onClick={(e) => { e.preventDefault(); showAlert(); }}>Esqueci minha Senha</a>
              <Link to="/cadastro-anunciante">Novo Cadastro</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Exporte o componente LoginPage
export default LoginPage;
