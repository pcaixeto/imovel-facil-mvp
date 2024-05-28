import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ma.css';
import { consultarTodosAnuncios } from '../../../api/ConsultarTodosAnunciosApi';
import { AnuncioResponse } from '../../../interfaces/AnuncioResponse'; 
import { deletarAnuncioApi } from '../../../api/DeletarAnuncioApi';
import { consultarMeusAnunciosApi } from '../../../api/ConsultarMeusAnunciosApi';

interface MeusAnunciosPageProps {
  user: { email: string; tipoCliente: number, idCliente: number, nomeCliente: string; };
}

const MeusAnuncios: React.FC<MeusAnunciosPageProps> = ({ user }) => {
  const [anuncios, setAnuncios] = useState<AnuncioResponse[]>([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const meusAnunciosData = await consultarMeusAnunciosApi(user.idCliente);
        setAnuncios(meusAnunciosData);
      } catch (error) {
        console.error('Erro ao consultar anúncios:', error);
      }
    };

    fetchAnuncios();
  }, [user.idCliente]);

  const handleEditAnuncio = (anuncioId: number) => {
    navigate(`/editar-anuncio/${anuncioId}`);
  }

// Frontend (React)
const handleDeleteAnuncio = async (anuncioId: number) => {
  try{  
    await deletarAnuncioApi(anuncioId);
    setAnuncios(anuncios.filter((anuncio) => anuncio.idAnuncio !== anuncioId));
    window.location.reload();
    console.log('Anúncio deletado com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar anúncio:', error);
  }
  window.location.reload();
};


  return (
    <div className="pagina-listar-meus-anuncios">
      <h2 className="h2-listar-meus-anuncios">Meus Anúncios</h2>
      <div className="conteudo-listar-meus-anuncios">
        {anuncios.map((anuncio) => (
          <div key={anuncio.idAnuncio} className="meu-anuncio-item">
            <div>{anuncio.nomeAnuncio || 'erro'}</div>
            <div>Descrição: {anuncio.descricaoAnuncio}</div>
            <div>     
        Tipo de Imóvel: {anuncio.tipoImovel ? anuncio.tipoImovel.tipoImovel : 'Não especificado'}
      </div>
            <div>Bairro: {anuncio.bairro || 'Estado não especificado'}</div>
            <div>Valor: R$ {anuncio.valorVendaImovel || 'Estado não especificado'},00 </div>
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
      <Link to="/home" className="botao-voltar-lista-meus-anuncios">
        Voltar para a página inicial
      </Link>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Anúncio Reservado com Sucesso</h3>
            <button onClick={() => setShowPopup(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusAnuncios;