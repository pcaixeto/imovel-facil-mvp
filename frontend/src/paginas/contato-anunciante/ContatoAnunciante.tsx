import React, { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './contactarAnunciante.css';

const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

const ContactarAnunciante: React.FC = () => {
  const { id, telefone } = useParams<{ id: string, telefone: string }>();
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMensagem(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      alert('Mensagem enviada com sucesso!');
      navigate('/listar-anuncio');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
  };

  return (
    <div className="pagina-contactar-anunciante">
      <h2 className="h2-contactar-anunciante">Enviando mensagem para o número {formatPhoneNumber(telefone || '')}</h2>
      <form className="conteudo-contactar-anunciante" onSubmit={handleSubmit}>
        <div>
          <label className="label-contactar-anunciante">Mensagem:</label>
          <textarea
            name="mensagem"
            value={mensagem}
            onChange={handleInputChange}
            rows={10}
            cols={50}
            className="textarea-mensagem"
          />
        </div>
        <button type="submit" className="button-enviar-mensagem">Enviar</button>
      </form>
    </div>
  );
};

export default ContactarAnunciante;
