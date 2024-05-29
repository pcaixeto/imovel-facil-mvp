import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './buscarAnuncio.css';
import { BuscaAnuncioFilter } from '../../interfaces/BuscaAnuncioFiltro';
import { buscarAnunciosApi } from '../../api/buscarAnunciosApi';
import { AnuncioResponse} from '../../interfaces/AnuncioResponse';
import { consultarAnuncioPorIdApi } from '../../api/ConsultarAnuncioPorId';

interface BuscarAnuncioPageProps {
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

const BuscaAnuncio: React.FC<BuscarAnuncioPageProps> = ({ user }) => {
  const [estadoBusca, setEstadoBusca] = useState<string>('');
  const [cidadeBusca, setCidadeBusca] = useState<string>('');
  const [bairroBusca, setBairroBusca] = useState<string>('');
  const [anuncios, setAnuncios] = useState<AnuncioResponse[]>([]);
  const [mensagem, setMensagem] = useState<string>('');
  const navigate = useNavigate();

  const handleBuscaAnuncios = async () => {
    try {
      const anunciosEncontrados = await buscarAnunciosApi({
        estado: estadoBusca, 
        cidade: cidadeBusca, 
        bairro: bairroBusca,
      });

      if (anunciosEncontrados.length === 0) {
        setMensagem('Nenhum anúncio encontrado com os critérios informados');
      } else {
        setAnuncios(anunciosEncontrados);
        setMensagem('');
      }
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
      setMensagem('Erro ao buscar anúncios');
    }
  };

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

  const handleContactarAnunciante = (idAnuncio: number, telefoneAnunciante: string) => {
    navigate(`/contactar-anunciante/${idAnuncio}/${telefoneAnunciante}`);
  };

  return (
    <div className="pagina-busca-anuncio">
      <h2 className="h2-busca-anuncio">Buscar Anúncio</h2>
      <div className="form-busca-anuncio">
        <div>
          <label htmlFor="estadoInput">Estado:</label>
          <input
            type="text"
            id="estadoInput"
            value={estadoBusca}
            onChange={(e) => setEstadoBusca(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cidadeInput">Cidade:</label>
          <input
            type="text"
            id="cidadeInput"
            value={cidadeBusca}
            onChange={(e) => setCidadeBusca(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bairroInput">Bairro:</label>
          <input
            type="text"
            id="bairroInput"
            value={bairroBusca}
            onChange={(e) => setBairroBusca(e.target.value)}
          />
        </div>
        <button onClick={handleBuscaAnuncios}>Buscar</button>
        <Link to="/home" className="botao-voltar-busca">Voltar</Link>
      </div>
      {mensagem && <div className="mensagem">{mensagem}</div>}
      <div className="conteudo-busca-anuncio">
        {anuncios.map((anuncio) => (
          <div key={anuncio.idAnuncio} className="anuncio-item">
            <div>{anuncio.nomeAnuncio || 'erro'}</div>
            <div>{anuncio.descricaoAnuncio}</div>
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
            <button onClick={() => handleContactarAnunciante(anuncio.idAnuncio, anuncio.telefoneAnunciante || '')} className="link-ver-detalhes2">
              Entrar em contato com anunciante
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuscaAnuncio;