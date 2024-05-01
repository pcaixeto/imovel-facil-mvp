import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ma.css';
import { consultarAnunciosApi } from '../../../api/ConsultarAnunciosNaoReservadosApi'
import { AnuncioResponse } from '../../../interfaces/AnuncioResponse'; 
import { consultarAnuncioPorIdApi } from '../../../api/ConsultarAnuncioPorId';
import { deletarAnuncioApi } from '../../../api/DeletarAnuncioApi';

const MeusAnuncios: React.FC = () => {
  const [anuncios, setAnuncios] = useState<AnuncioResponse[]>([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const anunciosData = await consultarAnunciosApi();
        const anunciosNaoReservados = anunciosData.filter((anuncio) => !anuncio.reservado);
        setAnuncios(anunciosNaoReservados);
        console.log(anunciosNaoReservados);
      } catch (error) {
        console.error('Erro ao consultar anúncios:', error);
      }
    };

    fetchAnuncios();
  }, []);

  const handleEditAnuncio = (anuncioId: number) => {
    navigate(`/editar-anuncio/${anuncioId}`);
  }

// Frontend (React)
const handleDeleteAnuncio = async (anuncioId: number) => {
  try{  
    await deletarAnuncioApi(anuncioId);
    setAnuncios(anuncios.filter((anuncio) => anuncio.idAnuncio !== anuncioId));
    console.log('Anúncio deletado com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar anúncio:', error);
  }
};


  return (
    <div className="pagina-listar-meus-anuncios">
      <h2 className="h2-listar-meus-anuncios">Meus Anúncios</h2>
      <div className="conteudo-listar-meus-anuncios">
        {anuncios.map((anuncio) => (
          <div key={anuncio.idAnuncio} className="meu-anuncio-item">
            <div>ID: {anuncio.idAnuncio}</div>
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
              <Link to={`/anuncio/${anuncio.idAnuncio}`} className="link-ver-detalhes-meu-anuncio">
                Ver Detalhes
              </Link>
              <button onClick={() => handleEditAnuncio(anuncio.idAnuncio)} className="botao-editar-meu-anuncio">
                Editar
              </button>
              <button onClick={() => handleDeleteAnuncio(anuncio.idAnuncio)} className="botao-deletar-meu-anuncio">
                Deletar
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