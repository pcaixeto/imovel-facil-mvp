import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ma.css';

interface Anuncio {
  id: string;
  tipo: string;
  endereco?: string;
  estado?: string;
  cidade?: string;
  reservado?: boolean;
}

const MeusAnuncios: React.FC = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const anunciosLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
    setAnuncios(anunciosLocalStorage);
  }, []);

  const handleEditAnuncio = (anuncioId: string) => {
    navigate(`/editar-anuncio/${anuncioId}`);
  };

  return (
    <div className="pagina-listar-meus-anuncios">
      <h2 className="h2-listar-meus-anuncios">Meus Anúncios</h2>
      <div className="conteudo-listar-meus-anuncios">
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} className="meu-anuncio-item">
            <div>ID: {anuncio.id}</div>
            <div>Tipo: {anuncio.tipo}</div>
            <div>Estado: {anuncio.estado || 'Estado não especificado'}</div>
            <div>Cidade: {anuncio.cidade || 'Cidade não especificado'}</div>
            <div>
              Reservado:
              {anuncio.reservado ? (
                <span className="meu-anuncio-reservado">Sim</span>
              ) : (
                <span className="meu-anuncio-nao-reservado">Não</span>
              )}
            </div>
            <div className="meu-anuncio-acoes">
              <Link to={`/anuncio/${anuncio.id}`} className="link-ver-detalhes-meu-anuncio">
                Ver Detalhes
              </Link>
              <button onClick={() => handleEditAnuncio(anuncio.id)} className="botao-editar-meu-anuncio">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="botao-voltar-lista-meus-anuncios">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default MeusAnuncios;