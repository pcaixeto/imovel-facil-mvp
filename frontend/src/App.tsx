import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './paginas/home/Home';
import CriarAnuncio from './paginas/criar-anuncio/CriarAnuncio';
import PaginaAnuncio from './paginas/paginaanuncio/PaginaAnuncio';
import ImoveisDisponiveis from './paginas/lista-anuncios/imoveis-disponiveis/ImoveisDisponiveis';
import AnunciosReservados from './paginas/lista-anuncios/anuncios-reservados/AnunciosReservados';
import MeusAnuncios from './paginas/lista-anuncios/meus-anuncios/MeusAnuncios';
import BuscarAnuncio from './paginas/buscar-anuncio/BuscarAnuncio';
import EditarAnuncios from './paginas/editar-anuncio/EditarAnuncio';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-anuncio" element={<CriarAnuncio />} />
          <Route path="/listar-anuncio" element={<ImoveisDisponiveis />} />
          <Route path="/listar-anuncios-reservados" element={<AnunciosReservados />} />
          <Route path="/anuncio/:id" element={<PaginaAnuncio />} />
          <Route path="/buscar-anuncio" element={<BuscarAnuncio />} />
          <Route path="/meus-anuncios" element={<MeusAnuncios />} />
          <Route path="/editar-anuncio/:id" element={<EditarAnuncios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
