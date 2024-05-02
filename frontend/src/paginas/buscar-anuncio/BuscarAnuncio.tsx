import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './buscarAnuncio.css';
import { BuscaAnuncioFilter } from '../../interfaces/BuscaAnuncioFiltro';
import { buscarAnunciosApi } from '../../api/buscarAnunciosApi';
import { AnuncioResponse } from '../../interfaces/AnuncioResponse';

const BuscaAnuncio: React.FC = () => {
  const [estadoBusca, setEstadoBusca] = useState<string>('');
  const [cidadeBusca, setCidadeBusca] = useState<string>('');
  const [bairroBusca, setBairroBusca] = useState<string>('');
  const [anuncios, setAnuncios] = useState<AnuncioResponse[]>([]);
  const [mensagem, setMensagem] = useState<string>('');

  const handleBuscaAnuncios = async () => {
    try {
      const anunciosEncontrados = await buscarAnunciosApi({
        estado: estadoBusca, 
        cidade: cidadeBusca, 
        bairro: bairroBusca
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
        <Link to="/" className="botao-voltar-busca">Voltar</Link>
      </div>
      {mensagem && <div className="mensagem">{mensagem}</div>}
      <div className="conteudo-busca-anuncio">
        {anuncios.map((anuncio) => (
          <div key={anuncio.idAnuncio} className="anuncio-item">
            <div>Tipo: {anuncio.tipo}</div>
            <div>Estado: {anuncio.estado}</div>
            <div>Cidade: {anuncio.cidade}</div>
            <div>Bairro: {anuncio.bairro}</div>
            <Link to={`/anuncio/${anuncio.idAnuncio}`} className="link-ver-detalhes">Ver Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuscaAnuncio;