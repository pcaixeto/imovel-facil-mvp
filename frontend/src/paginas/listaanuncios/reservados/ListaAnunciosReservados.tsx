import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './lar.css'

interface Anuncio {
  id: string;
  tipo: string;
  endereco?: string;
  estado?: string;
  reservado?: boolean;
  cidade?: string;
}

const ListarAnunciosReservados: React.FC = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);

  useEffect(() => {
    const anunciosLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
    // Filtrar os anúncios que não estão reservados
    const anunciosNaoReservados = anunciosLocalStorage.filter((anuncio) => anuncio.reservado);
    setAnuncios(anunciosNaoReservados);
  }, []);

  return (
    <div className="pagina-listar-anuncios">
      <h2 className="h2-listar-anuncios">Lista de Anúncios</h2>
      <div className="conteudo-listar-anuncios">
        {anuncios.map((anuncio) => (
          <div key={anuncio.id} className="anuncio-item">
            <div>ID: {anuncio.id}</div>
            <div>Tipo: {anuncio.tipo}</div>
            <div>Estado: {anuncio.estado || 'Estado não especificado'}</div>
            <div>Cidade: {anuncio.cidade || 'Cidade não especificado'}</div>
            <Link to={`/anuncio/${anuncio.id}`} className="link-ver-detalhes">
              Ver Detalhes
            </Link>
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