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
      <h2 className="h2-anuncio">Detalhes do Anúncio</h2>
      <div className="conteudo-anuncio">
        <div>Tipo: {anuncio.tipo}</div>
        <div>Endereço: {anuncio.endereco}</div>
        <div>Estado: {anuncio.estado}</div>
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























// interface Anuncio {
//   id: string;
//   tipo: string;
//   dataPostagem: string;
//   cozinhaCompartilhada?: boolean;
//   banheiroCompartilhado?: boolean;
//   tamanhoRepublica?: string;
//   tamanhoQuarto?: string;
//   numMoradores?: number;
//   valorAluguel?: string;
//   tamanhoApartamento?: string;
//   numComodos?: number;
//   valorCondominio?: string;
//   fotos?: FileList | null;
//   contatos?: string;
//   endereco?: string;
//   estado?: string;
//   cidade?: string;
//   bairro?: string;
//   reservado?: boolean;
// }

// const PaginaAnuncio: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulando a obtenção do anúncio do localStorage com base no ID
//     const anuncioLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
//     const foundAnuncio = anuncioLocalStorage.find((item) => item.id === id);
//     setAnuncio(foundAnuncio || null);
//   }, [id]);

//   const reservarAnuncio = () => {
//     // Atualiza o estado do anúncio para "reservado"
//     const updatedAnuncio: Anuncio = { ...anuncio!, reservado: true };
//     setAnuncio(updatedAnuncio);

//     // Atualiza o anúncio no localStorage
//     const anuncioLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
//     const updatedAnuncios = anuncioLocalStorage.map((item) =>
//       item.id === updatedAnuncio.id ? updatedAnuncio : item
//     );
//     localStorage.setItem('anuncios', JSON.stringify(updatedAnuncios));

//     // Exibe um alerta informando que o anúncio foi reservado
//     alert('Anúncio reservado com sucesso!');

//     // Redireciona o usuário para a página inicial
//     navigate('/');
//   };

//   const cancelarReserva = () => {
//     // Atualiza o estado do anúncio para "não reservado"
//     const updatedAnuncio: Anuncio = { ...anuncio!, reservado: false };
//     setAnuncio(updatedAnuncio);

//     // Atualiza o anúncio no localStorage
//     const anuncioLocalStorage = JSON.parse(localStorage.getItem('anuncios') || '[]') as Anuncio[];
//     const updatedAnuncios = anuncioLocalStorage.map((item) =>
//       item.id === updatedAnuncio.id ? updatedAnuncio : item
//     );
//     localStorage.setItem('anuncios', JSON.stringify(updatedAnuncios));

//     // Exibe um alerta informando que a reserva foi cancelada
//     alert('Reserva cancelada com sucesso!');

//     // Redireciona o usuário para a página inicial
//     navigate('/');
//   };

//   if (!anuncio) {
//     return <div>Anúncio não encontrado.</div>;
//   }

//   return (
//     <div className="pagina-anuncio">
//       <h2 className="h2-anuncio">Detalhes do Anúncio</h2>
//       <div className="conteudo-anuncio">
//         <div>ID: {anuncio.id}</div>
//         <div>Tipo: {anuncio.tipo}</div>
//         <div>Data de Postagem: {anuncio.dataPostagem}</div>
//         {anuncio.tipo === 'republica' && (
//           <>
//             <div>Cozinha Compartilhada: {anuncio.cozinhaCompartilhada ? 'Sim' : 'Não'}</div>
//             <div>Banheiro Compartilhado: {anuncio.banheiroCompartilhado ? 'Sim' : 'Não'}</div>
//             <div>Tamanho da República: {anuncio.tamanhoRepublica}</div>
//             <div>Tamanho do Quarto: {anuncio.tamanhoQuarto}</div>
//             <div>Número de Moradores: {anuncio.numMoradores}</div>
//           </>
//         )}
//         {anuncio.tipo === 'apartamento' && (
//           <>
//             <div>Tamanho do Apartamento: {anuncio.tamanhoApartamento}</div>
//             <div>Número de Cômodos: {anuncio.numComodos}</div>
//             <div>Valor do Condomínio: {anuncio.valorCondominio}</div>
//           </>
//         )}
//         <div>Valor do Aluguel: {anuncio.valorAluguel}</div>
//         <div>Contatos: {anuncio.contatos}</div>
//         <div>Endereço: {anuncio.endereco}</div>
//         <div>Estado: {anuncio.estado}</div>
//         <div>Cidade: {anuncio.cidade}</div>
//         <div>Bairro: {anuncio.bairro}</div>
//         <div>Reservado: {anuncio.reservado ? 'Sim' : 'Não'}</div>
//         {/* Botão para voltar */}
//         <Link to="/" className="button-voltar-pagina-anuncio">
//           Voltar
//         </Link>
//         {/* Botão para reservar o anúncio */}
//         {!anuncio.reservado && (
//           <button className="button-reservar-anuncio" onClick={reservarAnuncio}>
//             Reservar Anúncio
//           </button>
//         )}
//         {/* Botão para cancelar a reserva */}
//         {anuncio.reservado && (
//           <button className="button-reservar-anuncio" onClick={cancelarReserva}>
//             Cancelar Reserva
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaginaAnuncio;