import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ea.css';

interface Anuncio {
  id: string;
  tipo: string;
  endereco?: string;
  estado?: string;
  cidade?: string;
  reservado?: boolean;
}

const EditarAnuncio: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tipo, setTipo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [reservado, setReservado] = useState(false);

  useEffect(() => {
    // Aqui você pode carregar os dados do anúncio com o ID fornecido
    const anuncioLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
    const anuncioEncontrado = anuncioLocalStorage.find((anuncio) => anuncio.id === id);
    if (anuncioEncontrado) {
      setTipo(anuncioEncontrado.tipo);
      setEndereco(anuncioEncontrado.endereco || '');
      setEstado(anuncioEncontrado.estado || '');
      setCidade(anuncioEncontrado.cidade || '');
      setReservado(anuncioEncontrado.reservado || false);
    } else {
      // Se o anúncio não for encontrado, redirecionar para a lista de anúncios
      navigate('/meus-anuncios');
    }
  }, [id, navigate]);

  const handleSalvar = () => {
    // Aqui você pode atualizar os dados do anúncio com o ID fornecido
    const anunciosLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
    const updatedAnuncios = anunciosLocalStorage.map((anuncio) =>
      anuncio.id === id ? { ...anuncio, tipo, endereco, estado, cidade, reservado } : anuncio
    );
    localStorage.setItem('anuncios', JSON.stringify(updatedAnuncios));
    navigate('/meus-anuncios');
  };

  return (
    <div className="pagina-editar-anuncio">
      <h2 className="h2-editar-anuncio">Editar Anúncio</h2>
      <div className="formulario-editar-anuncio">
        <label htmlFor="tipo">Tipo:</label>
        <input type="text" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />

        <label htmlFor="endereco">Endereço:</label>
        <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

        <label htmlFor="estado">Estado:</label>
        <input type="text" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />

        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />

        <label htmlFor="reservado">Reservado:</label>
        <input type="checkbox" id="reservado" checked={reservado} onChange={(e) => setReservado(e.target.checked)} />

        <div className="botoes-editar-anuncio">
          <button onClick={handleSalvar} className="botao-salvar-editar-anuncio">
            Salvar
          </button>
          <Link to="/meus-anuncios" className="botao-cancelar-editar-anuncio">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditarAnuncio;
