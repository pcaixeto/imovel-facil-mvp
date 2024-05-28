import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { criarAnuncioApi } from '../../api/CriarAnuncioApi';
import { consultarMeusImoveisApi } from '../../api/ConsultarMeusImoveisApi'; // API to fetch properties
import { AnuncioDTO } from '../../../../backend/src/dto/AnuncioDTO.dto';
import './ca.css';
import { ImovelResponse } from '../../interfaces/ImovelResponse';

interface CriarAnuncioProps {
  user: {
    email: string;
    tipoCliente: number;
    idCliente: number;
    nomeCliente: string;
  };
}

export enum TipoImovel {
  CASA = 3,
  APARTAMENTO = 2,
  REPUBLICA = 1,
}

interface AnuncioModel {
  idAnuncio?: number;
  nomeAnuncio: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  descricaoAnuncio: string;
  valorVendaImovel: number;
  valorAluguelImovel: number;
  valorCondominioApto: number;
  dataHoraPublicacao: string;
  dataHoraExpiracaoPublicacao: string;
  tamanhoImovel: number;
  numeroQuartos: number;
  numeroMoradoresRepublica?: number;
  fotos?: FileList | null;
  contatos?: string;
  tipoImovel: TipoImovel;
  reservado: boolean;
  anunciante: number;
  statusAnuncio?: number;
}

const CriarAnuncio: React.FC<CriarAnuncioProps> = ({ user }) => {
  const navigate = useNavigate();
  const [imoveis, setImoveis] = useState<ImovelResponse[]>([]);
  const [selectedImovelId, setSelectedImovelId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<AnuncioModel>>({
    nomeAnuncio: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    descricaoAnuncio: '',
    valorVendaImovel: 0,
    valorAluguelImovel: 0,
    valorCondominioApto: 0,
    tamanhoImovel: 0,
    numeroQuartos: 0,
    tipoImovel: TipoImovel.CASA,
    fotos: null,
    contatos: ''
  });

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const imoveisData = await consultarMeusImoveisApi(user.idCliente);
        setImoveis(imoveisData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchImoveis();
  }, [user.idCliente]);

  const handleSelectImovel = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedImovelId(selectedId);
    const selectedImovel = imoveis.find(imovel => imovel.idImovel === selectedId);
    if (selectedImovel) {
      setFormData({
        ...formData,
        endereco: selectedImovel.endereco,
        bairro: selectedImovel.bairro,
        cidade: selectedImovel.cidade,
        estado: selectedImovel.estado,
        tamanhoImovel: selectedImovel.tamanhoImovel,
        numeroQuartos: selectedImovel.numeroQuartos,
        tipoImovel: selectedImovel.tipoImovel ? TipoImovel[selectedImovel.tipoImovel.tipoImovel as keyof typeof TipoImovel] : formData.tipoImovel
      });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const criarAnuncio = async (event: FormEvent) => {
    event.preventDefault();
    const novoAnuncio: AnuncioDTO = {
      ...formData,
      anunciante: user.idCliente,
    } as AnuncioDTO; // Ensure casting is safe here
    try {
      const savedAnuncio = await criarAnuncioApi(novoAnuncio, novoAnuncio.anunciante);
      navigate(`/anuncio/${savedAnuncio.idAnuncio}`);
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
      alert('Erro ao criar o anúncio. Por favor, tente novamente.');
    }
  };

  return (
    <div className="pagina-criar-anuncio">
      <h2 className="h2-criar-anuncio">Criar Anúncio</h2>
      <form className="conteudo-criar-anuncio" onSubmit={criarAnuncio}>
        <div>
          <label className="label-criar-anuncio">Selecione um imóvel:</label>
          <select onChange={handleSelectImovel} value={selectedImovelId || ''}>
            <option value="">Selecione um imóvel</option>
            {imoveis.map(imovel => (
              <option key={imovel.idImovel} value={imovel.idImovel}>
                {imovel.endereco}, {imovel.cidade}
              </option>
            ))}
          </select>
        </div>
        {/* Ensure all inputs are included here, with handleInputChange handling their updates */}
        <div>
          <label className="label-criar-anuncio">Nome do Anúncio:</label>
          <input
            type="text"
            name="nomeAnuncio"
            value={formData.nomeAnuncio || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="button-criar-anuncio">Criar</button>
        <Link to="/home" className="botao-voltar-criar">Voltar</Link>
      </form>
    </div>
  );
}

export default CriarAnuncio;
