import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './buscarAnuncio.css';

interface Anuncio {
  id: string;
  tipo: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
}

const BuscaAnuncio: React.FC = () => {
  const [estadoBusca, setEstadoBusca] = useState<string>('');
  const [cidadeBusca, setCidadeBusca] = useState<string>('');
  const [bairroBusca, setBairroBusca] = useState<string>('');
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [mostrarAnuncios, setMostrarAnuncios] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>('');

  const handleBuscaAnuncios = () => {
    const anunciosLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
    let anunciosFiltrados: Anuncio[] = [];

    // Filtrar por estado
    if (estadoBusca !== '') {
      anunciosFiltrados = anunciosLocalStorage.filter((anuncio) => anuncio.estado === estadoBusca);
    }

    // Filtrar por cidade
    if (cidadeBusca !== '') {
      if (anunciosFiltrados.length > 0) {
        anunciosFiltrados = anunciosFiltrados.filter((anuncio) => anuncio.cidade === cidadeBusca);
      } else {
        anunciosFiltrados = anunciosLocalStorage.filter((anuncio) => anuncio.cidade === cidadeBusca);
      }
    }

    // Filtrar por bairro
    if (bairroBusca !== '') {
      if (anunciosFiltrados.length > 0) {
        anunciosFiltrados = anunciosFiltrados.filter((anuncio) => anuncio.bairro === bairroBusca);
      } else {
        anunciosFiltrados = anunciosLocalStorage.filter((anuncio) => anuncio.bairro === bairroBusca);
      }
    }

    if (anunciosFiltrados.length === 0) {
      setMensagem('Nenhum anúncio encontrado com os critérios informados');
    } else {
      setAnuncios(anunciosFiltrados);
      setMostrarAnuncios(true);
      setMensagem('');
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
        <div>
          <button onClick={handleBuscaAnuncios}>Buscar</button>
          <Link to="/" className="botao-voltar-busca">
            Voltar
          </Link>
        </div>
      </div>

      {mensagem && <div className="mensagem">{mensagem}</div>}
      {mostrarAnuncios && (
        <div className="conteudo-busca-anuncio">
          {anuncios.map((anuncio) => (
            <div key={anuncio.id} className="anuncio-item">
              <div>ID: {anuncio.id}</div>
              <div>Tipo: {anuncio.tipo}</div>
              <div>Estado: {anuncio.estado || 'Estado não especificado'}</div>
              <div>Cidade: {anuncio.cidade || 'Cidade não especificada'}</div>
              <div>Bairro: {anuncio.bairro || 'Bairro não especificado'}</div>
              <Link to={`/anuncio/${anuncio.id}`} className="link-ver-detalhes">
                Ver Detalhes
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuscaAnuncio;