import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { consultarAnunciosApi } from '../../../api/ConsultarAnunciosNaoReservadosApi'
import { AnuncioResponse } from '../../../interfaces/AnuncioResponse'; 
import './la.css'
import { consultarAnuncioPorIdApi } from '../../../api/ConsultarAnuncioPorId';
import { atualizarStatusAnuncioApi } from '../../../api/atualizarStatusAnuncioApi';
import { StatusImovel } from '../../../interfaces/StatusImovel';

// interface Anuncio {
//   id: string;
//   tipo: string;
//   endereco?: string;
//   estado?: string;
//   cidade?: string;
//   reservado: boolean;
// }

const ListarAnuncios: React.FC = () => {
  const [anuncios, setAnuncios] = useState<AnuncioResponse[]>([]);
  const [showPopup, setShowPopup] = useState(false);
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

  const handleVerDetalhes = async (idAnuncio: number) => {
    console.log('ID do anúncio clicado:', idAnuncio);
    try {
      console.log('entrei no try');
      const anuncio = await consultarAnuncioPorIdApi(idAnuncio);
      navigate(`/anuncio/${idAnuncio}`);
    } catch (error) {
      console.error('Erro ao consultar anúncio:', error);
    }
  };

  const handleReservarImovel = async (anuncioId: number) => {
    try {
      await atualizarStatusAnuncioApi(anuncioId, StatusImovel.RESERVADO);
      setAnuncios(
        anuncios.map((anuncio) =>
          anuncio.idAnuncio === anuncioId
            ? { ...anuncio, statusAnuncio: { idStatusAnuncio: 3 } }
            : anuncio
        )
      );
      setShowPopup(true);
      console.log('Anúncio reservado com sucesso.');
    } catch (error) {
      console.error('Erro ao reservar anúncio:', error);
    }
  };

  return (
    <div className="pagina-listar-anuncios">
      <h2 className="h2-listar-anuncios">Lista de Anúncios</h2>
      <div className="conteudo-listar-anuncios">
      {anuncios.map((anuncio) => {
        console.log('Anúncio:', anuncio); // Verifique a estrutura de cada anúncio
        return (
          <div key={anuncio.idAnuncio} className="anuncio-item">
            <div>Tipo: {anuncio.tipo}</div>
            <div>Estado: {anuncio.estado || 'Estado não especificado'}</div>
            <div>Cidade: {anuncio.cidade || 'Cidade não especificada'}</div>
            <button
              onClick={() => handleVerDetalhes(anuncio.idAnuncio)}
              className="link-ver-detalhes"
            >
              Ver Detalhes
            </button>
            <button onClick={() => handleReservarImovel(anuncio.idAnuncio)} className="botao-reservar-imovel">
              Reservar Imóvel
            </button>
          </div>
        );
      })}
      {showPopup && (
      <div className="popup">
        <div className="popup-content">
          <h3>Anúncio Reservado com Sucesso</h3>
          <button onClick={() => setShowPopup(false)}>Fechar</button>
        </div>
      </div>
    )}
    </div>
    <Link to="/" className="botao-voltar-lista">
      Voltar para a página inicial
    </Link>
  </div>
);
};

export default ListarAnuncios;