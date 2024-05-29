import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { criarAnuncioApi } from '../../api/CriarAnuncioApi';
import { consultarMeusImoveisApi } from '../../api/ConsultarMeusImoveisApi';
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

export enum PlanoAssinatura {
  FREE = 'Free',
  PREMIUM = 'Premium',
  BLACK = 'Black'
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
  telefoneAnunciante: string;
  tipoImovel: TipoImovel;
  reservado: boolean;
  anunciante: number;
  planoAssinatura: PlanoAssinatura;
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
    contatos: '',
    anunciante: user.idCliente,
    planoAssinatura: PlanoAssinatura.FREE,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

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
      setFormData(prevFormData => ({
        ...prevFormData,
        endereco: selectedImovel.endereco,
        bairro: selectedImovel.bairro,
        cidade: selectedImovel.cidade,
        estado: selectedImovel.estado,
        tamanhoImovel: selectedImovel.tamanhoImovel,
        numeroQuartos: selectedImovel.numeroQuartos,
        tipoImovel: selectedImovel.tipoImovel?.idTipoImovel || prevFormData.tipoImovel
      }));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    } as AnuncioDTO; // Ensure casting is safe here
    try {
      const savedAnuncio = await criarAnuncioApi(novoAnuncio, novoAnuncio.anunciante);
      setShowConfirmation(true);
      setTimeout(() => {
        navigate(`/anuncio/${savedAnuncio.idAnuncio}`);
      }, 3000); // Redireciona após 3 segundos
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
      alert('Erro ao criar o anúncio. Por favor, tente novamente.');
    }
  };

  return (
    <div className="pagina-criar-anuncio">
      <h2 className="h2-criar-anuncio">Criar Anúncio</h2>
      {showConfirmation && <div className="confirmation-message">Anúncio criado com sucesso! Redirecionando...</div>}
      <form className="conteudo-criar-anuncio" onSubmit={criarAnuncio}>
        {/* Imóvel selector */}
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

        {/* Anuncio fields */}
        <div>
          <label className="label-criar-anuncio">Nome do Anúncio:</label>
          <input
            type="text"
            name="nomeAnuncio"
            value={formData.nomeAnuncio || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Descrição do Anúncio:</label>
          <textarea
            name="descricaoAnuncio"
            value={formData.descricaoAnuncio || ''}
            onChange={handleInputChange}
            rows={5}
            cols={80}
            className="textarea-descricao"
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Telefone do Anunciante:</label>
          <input
            type="text"
            name="telefoneAnunciante"
            value={formData.telefoneAnunciante || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco || ''}
            onChange={handleInputChange}
            disabled={!!selectedImovelId}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro || ''}
            onChange={handleInputChange}
            disabled={!!selectedImovelId}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade || ''}
            onChange={handleInputChange}
            disabled={!!selectedImovelId}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado || ''}
            onChange={handleInputChange}
            disabled={!!selectedImovelId}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Tamanho do Imóvel (m²):</label>
          <input
            type="number"
            name="tamanhoImovel"
            value={formData.tamanhoImovel || ''}
            onChange={handleInputChange}
            disabled={!!selectedImovelId}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Número de Quartos:</label>
          <input
            type="number"
            name="numeroQuartos"
            value={formData.numeroQuartos || ''}
            onChange={handleInputChange}
            disabled={!!selectedImovelId}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Tipo de Imóvel:</label>
          <input
            type="text"
            name="tipoImovel"
            value={TipoImovel[formData.tipoImovel!] || ''}
            readOnly
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Plano de Assinatura:</label>
          <select name="planoAssinatura" value={formData.planoAssinatura} onChange={handleInputChange}>
            <option value={PlanoAssinatura.FREE}>Free - 20 dias</option>
            <option value={PlanoAssinatura.PREMIUM}>Premium - 90 dias</option>
            <option value={PlanoAssinatura.BLACK}>Black - 270 dias</option>
          </select>
        </div>
        <div>
          <label className="label-criar-anuncio">Valor Venda do Imóvel:</label>
          <input
            type="number"
            name="valorVendaImovel"
            value={formData.valorVendaImovel || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Valor Aluguel do Imóvel:</label>
          <input
            type="number"
            name="valorAluguelImovel"
            value={formData.valorAluguelImovel || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Valor do Condomínio:</label>
          <input
            type="number"
            name="valorCondominioApto"
            value={formData.valorCondominioApto || ''}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="button-criar-anuncio">Criar</button>
        <Link to="/home" className="botao-voltar-criar">Voltar</Link>
      </form>
    </div>
  );
};

export default CriarAnuncio;
