import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnuncioResponse } from '../../interfaces/AnuncioResponse';
import { consultarAnuncioPorIdApi } from '../../api/ConsultarAnuncioPorId';
import { editarAnuncio } from '../../api/EditarAnuncioApi';
import './ea.css';

const EditarAnuncio: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [anuncio, setAnuncio] = useState<AnuncioResponse | null>(null);
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [reservado, setReservado] = useState(false);

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        if (id) {
          const numericId = parseInt(id);
          const anuncioData = await consultarAnuncioPorIdApi(numericId);
          setAnuncio(anuncioData);
          setNome(anuncioData?.nomeAnuncio || '');
          setValor(anuncioData?.valorVendaImovel.toString() || '');
          setTipo(anuncioData?.tipo || '');
          setDescricao(anuncioData?.descricaoAnuncio || '');
          setEndereco(anuncioData?.endereco || '');
          setEstado(anuncioData?.estado || '');
          setCidade(anuncioData?.cidade || '');
          setReservado(anuncioData?.reservado || false);
        } else {
          console.error('ID de anúncio não informado.');
          alert('Falha ao carregar o anúncio.');
          navigate('/meus-anuncios');
        }
      } catch (error) {
        console.error('Erro ao consultar anúncio:', error);
        alert('Falha ao carregar o anúncio.');
        navigate('/meus-anuncios');
      }
    };

    fetchAnuncio();
  }, [id, navigate]);

  const handleSalvar = async () => {
    try {
      if (anuncio) {
        const updatedAnuncio: AnuncioResponse = {
          idAnuncio: anuncio.idAnuncio,
          nomeAnuncio: nome, // Use nome em vez de nomeAnuncio
          valorVendaImovel: parseFloat(valor),
          descricaoAnuncio: descricao,
          tipo,
          endereco,
          estado,
          cidade,
          reservado,
        };
        // Faça a chamada para atualizar o anúncio no banco de dados
        await editarAnuncio(updatedAnuncio.idAnuncio,updatedAnuncio);
        navigate('/meus-anuncios');
      } else {
        console.error('Anúncio não carregado.');
        alert('Falha ao atualizar o anúncio.');
        navigate('/meus-anuncios');
      }
    } catch (error) {
      console.error('Erro ao atualizar anúncio:', error);
      alert('Falha ao atualizar o anúncio.');
    }
  };

  if (!anuncio) {
    return <div>Anúncio não encontrado.</div>;
  }

  return (
    <div className="pagina-editar-anuncio">
      <h2 className="h2-editar-anuncio">Editar Anúncio</h2>
      <div className="formulario-editar-anuncio">
        <label htmlFor="tipo">Tipo:</label>
        <input type="text" id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />

        <label htmlFor="endereco">Endereço:</label>
        <input type="text" id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

        <label htmlFor="estado">Estado:</label>
        <input type="text" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />

        <label htmlFor="cidade">Cidade:</label>
        <input type="text" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />

        <label htmlFor="reservado">Reservado:</label>
        <input type="checkbox" id="reservado" checked={reservado} onChange={(e) => setReservado(e.target.checked)} />

        <div className="botoes-editar-anuncio">
          <button onClick={handleSalvar} className="botao-salvar-editar-anuncio">
            Salvar
          </button>
          <button onClick={() => navigate('/meus-anuncios')} className="botao-cancelar-editar-anuncio">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarAnuncio;