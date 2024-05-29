import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { consultarAnunciosApi } from '../../../api/ConsultarAnunciosDisponiveisApi'
import { AnuncioResponse } from '../../../interfaces/AnuncioResponse'; 
import './la.css'
import { consultarAnuncioPorIdApi } from '../../../api/ConsultarAnuncioPorId';
import { atualizarStatusAnuncioApi } from '../../../api/atualizarStatusAnuncioApi';
import { StatusImovel } from '../../../interfaces/StatusImovel';

interface ImoveisDisponiveisPageProps {
  user: { email: string; tipoCliente: number, idCliente: number, nomeCliente: string; };
}

const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};


const ImoveisDisponiveis: React.FC<ImoveisDisponiveisPageProps> = ({ user }) => {
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
      <h2 className="h2-listar-anuncios">Imóveis Disponíveis</h2>
      <div className="conteudo-listar-anuncios">
      {anuncios.map((anuncio) => {
        console.log('Anúncio:', anuncio); // Verifique a estrutura de cada anúncio
        return (
          <div key={anuncio.idAnuncio} className="anuncio-item">
            <div>{anuncio.nomeAnuncio || 'erro'}</div>
            <div>Descrição: {anuncio.descricaoAnuncio}</div>
            <div>Contato do anunciante: <strong>{formatPhoneNumber(anuncio.telefoneAnunciante || '')}</strong></div>
            <div>     
              Tipo de Imóvel: {anuncio.tipoImovel ? anuncio.tipoImovel.tipoImovel : 'Não especificado'}
            </div>
            <div>Bairro: {anuncio.bairro || 'Estado não especificado'}</div>
            <div>Valor: R$ {anuncio.valorVendaImovel || 'Estado não especificado'},00 </div>
            <br></br>
            <button
              onClick={() => handleVerDetalhes(anuncio.idAnuncio)}
              className="link-ver-detalhes2"
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
          <button onClick={() => {
              setShowPopup(false);
              window.location.reload(); // Recarrega a página ao fechar o popup
            }}>Fechar</button>
        </div>
      </div>
    )}
    </div>
    <Link to="/home" className="botao-voltar-lista">
      Voltar para a página inicial
    </Link>
  </div>
);
};

export default ImoveisDisponiveis;