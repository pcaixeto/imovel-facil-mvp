import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

interface HomePageProps {
  user: { email: string; tipoCliente: number, idCliente: number, nomeCliente: string; };
}


const Home: React.FC<HomePageProps> = ({ user }) => {
  return (
    <div className="container-home">
      <h1>Bem vindo, {user.nomeCliente}!</h1>
      <div className="container-botoes">
        {user.tipoCliente === 1 ? ( // "anunciante" user
          <>
            <Link to="/criar-anuncio">
              <button>Criar Anúncio</button>
            </Link>
            <Link to="/listar-anuncio">
              <button>Imóveis Disponíveis</button>
            </Link>
            <Link to="/buscar-anuncio">
              <button>Buscar Anuncio</button>
            </Link>
            <Link to="/listar-anuncios-reservados">
              <button>Anúncios Reservados</button>
            </Link>
            <Link to="/meus-anuncios">
              <button>Meus Anúncios</button>
            </Link>
            <Link to="/login">
              <button>Logout</button>
            </Link>
          </>
        ) : ( // "estudante" user
          <>
            <Link to="/buscar-anuncio">
              <button>Buscar Anuncio</button>
            </Link>
            <Link to="/listar-anuncio">
              <button>Imóveis Disponíveis</button>
            </Link>
            <Link to="/listar-anuncios-reservados">
              <button>Anúncios Reservados</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;