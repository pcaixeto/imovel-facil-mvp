import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AnuncioResponse } from '../../interfaces/AnuncioResponse';
import './pa.css';
import { consultarAnuncioPorIdApi } from '../../api/ConsultarAnuncioPorId';

const PaginaAnuncio: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [anuncio, setAnuncio] = useState<AnuncioResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        if (id) {
          const numericId = parseInt(id);
          const anuncioData = await consultarAnuncioPorIdApi(numericId);
          setAnuncio(anuncioData);
        } else {
          console.error('ID de anúncio não informado.');
          alert('Falha ao carregar o anúncio.');
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao consultar anúncio:', error);
        alert('Falha ao carregar o anúncio.');
        navigate('/');
      }
    };

    if (id) {
      fetchAnuncio();
    } else {
      console.error('ID de anúncio não informado.');
      alert('Falha ao carregar o anúncio.');
      navigate('/');
    }
  }, [id, navigate]);

  if (!anuncio) {
    return <div>Anúncio não encontrado.</div>;
  }

  return (
    <div className="pagina-anuncio">
      <h2 className="h2-anuncio">        <div>{anuncio.nomeAnuncio}</div>
</h2>
      <div className="conteudo-anuncio">
        <div>Descrição: {anuncio.descricaoAnuncio}</div>
        <div>Valor: R$ {anuncio.valorVendaImovel || 'Estado não especificado'},00 </div>
        <div>Endereço: {anuncio.endereco}</div>
        <div>Estado: {anuncio.estado}</div>
        <div>Bairro: {anuncio.bairro || 'Estado não especificado'}</div>
        <div>Cidade: {anuncio.cidade}</div>
        <div>Reservado: {anuncio.reservado ? 'Sim' : 'Não'}</div>
        <Link to="/" className="button-voltar-pagina-anuncio">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default PaginaAnuncio;
