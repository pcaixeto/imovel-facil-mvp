import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { criarAnuncioApi } from '../../CriarAnuncioApi'; // Certifique-se de que o caminho está correto
import { AnuncioDTO } from '../../../../backend/src/dto/AnuncioDTO.dto'

interface AnuncioModel {
  idAnuncio?: number; // Opcional se for gerado automaticamente no backend
  nomeAnuncio: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  descricaoAnuncio: string;
  valorVendaImovel: number;
  valorAluguelImovel: number;
  valorCondominioApto: number; // Definido como obrigatório de acordo com a entidade
  dataHoraPublicacao: string; // Use string para datas para compatibilidade no envio
  dataHoraExpiracaoPublicacao: string;
  tamanhoImovel: number;
  numeroQuartos: number;
  numeroMoradoresRepublica?: number; // Opcional baseado na entidade
  fotos?: FileList | null;
  contatos?: string;
  tipoImovel: string; // Supondo que isso seja um identificador ou descrição simples
  reservado: boolean;
  anunciante?: number;  // Opcional, supondo ID do anunciante
  statusAnuncio?: number; // Opcional, supondo ID do status
}



const CriarAnuncio: React.FC = () => {
  const navigate = useNavigate();
  const [tipoAnuncio, setTipoAnuncio] = useState<string>('');
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
    tipoImovel: '',
    fotos: null,
    contatos: ''
  });

  const handleTipoAnuncioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTipoAnuncio(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      tipoImovel: event.target.value
    }));
  };
  

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (event.target as HTMLInputElement).files
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'number' ? parseFloat(value) : value,
      }));
    }
  };

  const criarAnuncio = async (event: FormEvent) => {
    event.preventDefault();
    
    const novoAnuncio: AnuncioDTO = {
      nomeAnuncio: formData.nomeAnuncio || "Anúncio Sem Nome",
      endereco: formData.endereco || "Endereço Não Especificado",
      bairro: formData.bairro || "Bairro Não Especificado",
      cidade: formData.cidade || "Cidade Não Especificada",
      estado: formData.estado || "Estado Não Especificado",
      descricaoAnuncio: formData.descricaoAnuncio || "Descrição Não Disponível",
      valorVendaImovel: formData.valorVendaImovel || 0,
      valorAluguelImovel: formData.valorAluguelImovel || 0,
      valorCondominioApto: formData.valorCondominioApto || 0,
      tamanhoImovel: formData.tamanhoImovel || 0,
      numeroQuartos: formData.numeroQuartos || 0,
      tipoImovel: formData.tipoImovel || "Default Type",
      // Assumindo que fotos e contatos são manipulados adequadamente
    };
  
    try {
      const savedAnuncio = await criarAnuncioApi(novoAnuncio);
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
          Selecione o tipo de imóvel:
          <label className="label-criar-anuncio">
            <input
              type="radio"
              name="tipo"
              value="republica"
              checked={tipoAnuncio === 'republica'}
              onChange={handleTipoAnuncioChange}
            />
            República
          </label>
          <label className="label-criar-anuncio">
            <input
              type="radio"
              name="tipo"
              value="apartamento"
              checked={tipoAnuncio === 'apartamento'}
              onChange={handleTipoAnuncioChange}
            />
            Apartamento
          </label>
        </div>

        <div>
          <label className="label-criar-anuncio">Fotos:</label>
          <input
            type="file"
            name="fotos"
            multiple
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Contatos:</label>
          <input
            type="text"
            name="contatos"
            value={formData.contatos || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="label-criar-anuncio">
            Endereço:
            <input
              type="text"
              name="endereco"
              value={formData.endereco || ''}
              onChange={handleInputChange}
            />
          </label>
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

        <div>
          <label className="label-criar-anuncio">Tamanho do Imóvel (m²):</label>
          <input
            type="number"
            name="tamanhoImovel"
            value={formData.tamanhoImovel || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="label-criar-anuncio">Número de Quartos:</label>
          <input
            type="number"
            name="numeroQuartos"
            value={formData.numeroQuartos || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit" className="button-criar-anuncio">Criar</button>
        <Link to="/" className="botao-voltar-criar">Voltar</Link>
      </form>
    </div>
  );
};

export default CriarAnuncio;
