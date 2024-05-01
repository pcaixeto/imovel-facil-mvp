// Importe as bibliotecas necessárias do React e do React Router DOM
import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link para criar links

import './home.css';

// Crie o componente HomePage
const Home: React.FC = () => {
  return (
    <div className='container-home'>
      {/* Adicione o h1 com o texto desejado */}
      <h1>Bem vindo ao ImovelFacil</h1>
      {/* Crie a div com os botões */}
      <div className='container-botoes'>
        {/* Botão "criar anuncio" com Link para a rota /criaranuncio */}
        <Link to="/criar-anuncio">
          <button>Criar Anúncio</button>
        </Link>
        {/* Botões placeholders */}
        <Link to="/listar-anuncio">
          <button>Anúncios Não Reservados</button>
        </Link>
        {/* Botões placeholders */}
        <Link to="/buscar-anuncio">
          <button>Buscar Anuncio</button>
        </Link>
        <Link to="/listar-anuncios-reservados">
          <button>Anúncios Reservados</button>
        </Link>
        <Link to="/meus-anuncios">
          <button>Meus Anúncios</button>
        </Link>
      </div>
    </div>
  );
}

// Exporte o componente HomePage
export default Home;
