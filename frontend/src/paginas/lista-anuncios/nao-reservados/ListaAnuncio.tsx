import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { consultarAnunciosApi } from '../../../api/ConsultarAnunciosNaoReservadosApi'
import { AnuncioResponse } from '../../../interfaces/AnuncioResponse'; 
import './la.css'
import { consultarAnuncioPorIdApi } from '../../../api/ConsultarAnuncioPorId';

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
          </div>
        );
      })}
    </div>
    <Link to="/" className="botao-voltar-lista">
      Voltar para a página inicial
    </Link>
  </div>
);
};

export default ListarAnuncios;