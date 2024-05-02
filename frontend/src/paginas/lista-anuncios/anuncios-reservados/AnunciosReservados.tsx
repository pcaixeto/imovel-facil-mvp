import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './lar.css';
import { consultarAnunciosReservadosApi } from '../../../api/ConsultarAnunciosReservadosApi';
import { AnuncioResponse } from '../../../interfaces/AnuncioResponse';

// interface Anuncio {
//   id: string;
//   tipo: string;
//   endereco?: string;
//   estado?: string;
//   reservado?: boolean;
//   cidade?: string;
// }



const ListarAnunciosReservados: React.FC = () => {
  const [anuncios, setAnuncios] = useState<AnuncioResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReservados() {
      try {
        const anunciosReservados = await consultarAnunciosReservadosApi();
        setAnuncios(anunciosReservados);
      } catch (error) {
        console.error('Erro ao consultar anúncios reservados:', error);
      }
    }

    fetchReservados();
  }, []);

  const handleVerDetalhes = (id: number) => {
    navigate(`/anuncio/${id}`);
  };

  return (
    <div className="pagina-listar-anuncios">
      <h2 className="h2-listar-anuncios">Anúncios Reservados</h2>
      <div className="conteudo-listar-anuncios">
        {anuncios.map((anuncio) => (
          <div key={anuncio.idAnuncio} className="anuncio-item">
            <div>{anuncio.nomeAnuncio || 'erro'}</div>
            <div>Descrição: {anuncio.descricaoAnuncio}</div>
            <div>     
              Tipo de Imóvel: {anuncio.tipoImovel ? anuncio.tipoImovel.tipoImovel : 'Não especificado'}
            </div>
            <div>Bairro: {anuncio.bairro || 'Estado não especificado'}</div>
            <div>Valor: R$ {anuncio.valorVendaImovel || 'Estado não especificado'},00 </div>
            <button
              onClick={() => handleVerDetalhes(anuncio.idAnuncio)}
              className="link-ver-detalhes2"
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
      <Link to="/" className="botao-voltar-lista">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default ListarAnunciosReservados;
