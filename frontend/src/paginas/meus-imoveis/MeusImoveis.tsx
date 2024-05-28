import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './mi.css';  // Ensure this CSS file is appropriately styled for imoveis
import { ImovelResponse } from '../../interfaces/ImovelResponse';
import { consultarMeusImoveisApi } from '../../api/ConsultarMeusImoveisApi';
import { deletarImovelApi } from '../../api/DeletarImovelApi';

interface MeusImoveisPageProps {
  user: { email: string; tipoCliente: number, idCliente: number, nomeCliente: string; };
}

const MeusImoveis: React.FC<MeusImoveisPageProps> = ({ user }) => {
  const [imoveis, setImoveis] = useState<ImovelResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const meusImoveisData = await consultarMeusImoveisApi(user.idCliente);
        setImoveis(meusImoveisData);
      } catch (error) {
        console.error('Erro ao consultar imóveis:', error);
      }
    };

    fetchImoveis();
  }, [user.idCliente]);

  const handleEditImovel = (imovelId: number) => {
    navigate(`/editar-imovel/${imovelId}`);
  };

  const handleDeleteImovel = async (imovelId: number) => {
    try {
      await deletarImovelApi(imovelId);
      setImoveis(imoveis.filter((imovel) => imovel.idImovel !== imovelId));
      window.location.reload();
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
    }
  };

  return (
    <div className="pagina-listar-meus-imoveis">
      <h2 className="h2-listar-meus-imoveis">Meus Imóveis</h2>
      <div className="conteudo-listar-meus-imoveis">
        {imoveis.map((imovel) => (
          <div key={imovel.idImovel} className="meu-imovel-item">
            <div>Endereço: {imovel.endereco}</div>
            <div>Bairro: {imovel.bairro}</div>
            <div>Cidade: {imovel.cidade}</div>
            <div>Estado: {imovel.estado}</div>
            <p>
            Tipo de Imóvel: {imovel.tipoImovel ? imovel.tipoImovel.tipoImovel : 'Não especificado'}
            </p>
            <div>Tamanho do Imóvel: {imovel.tamanhoImovel} m²</div>
            <div className="meu-imovel-acoes">
              <Link to={`/imovel/${imovel.idImovel}`} className="link-ver-detalhes-meu-imovel">
                Ver Detalhes
              </Link>
              <button onClick={() => handleEditImovel(imovel.idImovel)} className="botao-editar-meu-imovel">
                Editar
              </button>
              <button onClick={() => handleDeleteImovel(imovel.idImovel)} className="botao-deletar-meu-imovel">
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/home" className="botao-voltar-lista-meus-imoveis">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default MeusImoveis;
