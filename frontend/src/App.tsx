import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './paginas/home/Home';
import CriarAnuncio from './paginas/criar-anuncio/CriarAnuncio';
import PaginaAnuncio from './paginas/paginaanuncio/PaginaAnuncio';
import ImoveisDisponiveis from './paginas/lista-anuncios/imoveis-disponiveis/ImoveisDisponiveis';
import AnunciosReservados from './paginas/lista-anuncios/anuncios-reservados/AnunciosReservados';
import MeusAnuncios from './paginas/lista-anuncios/meus-anuncios/MeusAnuncios';
import BuscarAnuncio from './paginas/buscar-anuncio/BuscarAnuncio';
import EditarAnuncios from './paginas/editar-anuncio/EditarAnuncio';
import LoginPage from './paginas/login-page/LoginPage';
import CadastroEstudantePage from './paginas/login-page-estudante/CadastroEstudantePage';
import CadastroAnunciantePage from './paginas/login-page-anunciante/CadastroAnunciantePage';

const App: React.FC = () => {
  const [user, setUser] = useState<{ email: string; tipoCliente: number, idCliente: number, nomeCliente: string } | null>(null);

  const handleLogin = (userData: { email: string; tipoCliente: number, idCliente: number, nomeCliente: string }) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/cadastro-estudante" element={<CadastroEstudantePage />} />
          <Route path="/cadastro-anunciante" element={<CadastroAnunciantePage />} />
          <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/criar-anuncio" element={user ? <CriarAnuncio /> : <Navigate to="/login" />} />
          <Route path="/listar-anuncio" element={user ? <ImoveisDisponiveis /> : <Navigate to="/login" />} />
          <Route path="/listar-anuncios-reservados" element={user ? <AnunciosReservados /> : <Navigate to="/login" />} />
          <Route path="/anuncio/:id" element={user ? <PaginaAnuncio /> : <Navigate to="/login" />} />
          <Route path="/buscar-anuncio" element={user ? <BuscarAnuncio /> : <Navigate to="/login" />} />
          <Route path="/meus-anuncios" element={user ? <MeusAnuncios /> : <Navigate to="/login" />} />
          <Route path="/editar-anuncio/:id" element={user ? <EditarAnuncios /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
