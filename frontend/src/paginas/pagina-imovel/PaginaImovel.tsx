import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './pi.css';
import { consultarImovelPorIdApi } from '../../api/ConsultarImovelPorId';
import { ImovelResponse } from '../../interfaces/ImovelResponse';

const PaginaImovel: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [imovel, setImovel] = useState<ImovelResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        if (id) {
          const numericId = parseInt(id);
          const imovelData = await consultarImovelPorIdApi(numericId);
          setImovel(imovelData);
        } else {
          console.error('ID de imóvel não informado.');
          alert('Falha ao carregar o imóvel.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao consultar imóvel:', error);
        alert('Falha ao carregar o imóvel.');
        navigate('/login');
      }
    };

    if (id) {
      fetchImovel();
    }
  }, [id, navigate]);

  if (!imovel) {
    return <div>Imóvel não encontrado.</div>;
  }

  return (
    <div className="pagina-imovel">
      <h2 className="h2-imovel">{imovel.endereco}</h2>
      <div className="conteudo-imovel">
        <div>Bairro: {imovel.bairro}</div>
        <div>Cidade: {imovel.cidade}</div>
        <div>Estado: {imovel.estado}</div>
        {/* <div>Tipo de Imóvel: {TipoImovel[imovel.tipoImovel]}</div>  */}
        <p>
        Tipo de Imóvel: {imovel.tipoImovel ? imovel.tipoImovel.tipoImovel : 'Não especificado'}
        </p>
        <div>Tamanho do Imóvel: {imovel.tamanhoImovel} m²</div>
        <div>Número de Quartos: {imovel.numeroQuartos}</div>
        <div>Número de Moradores (se república): {imovel.numeroMoradoresRepublica || 'N/A'}</div>
        <Link to="/home" className="button-voltar-pagina-imovel">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default PaginaImovel;
