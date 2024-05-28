import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cadastroImovelApi } from '../../api/CadastroImovelApi';
import './ci.css';
import { ImovelDTO } from '../../../../backend/src/dto/Imovel.dto';
import { Imovel } from '../../../../backend/src/entities/imovel.entity';

interface CadastroImovelProps {
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
  // Add more types as needed
}

interface ImovelModel {
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  tamanhoImovel: number;
  numeroQuartos: number;
  numeroMoradoresRepublica: number;
  tipoImovel: TipoImovel;
}

const CadastroImovel: React.FC<CadastroImovelProps> = ({ user }) => {
  const navigate = useNavigate();
  const [tipoImovel, setTipoImovel] = useState<TipoImovel>(TipoImovel.CASA);
  const [formData, setFormData] = useState<Partial<ImovelModel>>({
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    tamanhoImovel: 0,
    numeroQuartos: 0,
    numeroMoradoresRepublica: 0,
    tipoImovel: TipoImovel.CASA,
  });

  const handleTipoImovelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTipoImovel = parseInt(event.target.value) as TipoImovel;
    setTipoImovel(selectedTipoImovel);
    setFormData((prevData) => ({
      ...prevData,
      tipoImovel: selectedTipoImovel,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const cadastrarImovel = async (event: FormEvent) => {
    event.preventDefault();

    const novoImovel: ImovelDTO = {
      endereco: formData.endereco || "Endereço Não Especificado",
      bairro: formData.bairro || "Bairro Não Especificado",
      cidade: formData.cidade || "Cidade Não Especificada",
      estado: formData.estado || "Estado Não Especificado",
      tamanhoImovel: formData.tamanhoImovel || 0,
      numeroQuartos: formData.numeroQuartos || 0,
      numeroMoradoresRepublica: formData.numeroMoradoresRepublica || 0,
      tipoImovel: formData.tipoImovel || TipoImovel.CASA,
      clienteId: user.idCliente,
    };

    console.log("Recebido idCliente:", user.idCliente);
    console.log("DTO de Imóvel:", novoImovel);

    try {
      const savedImovel: Imovel = await cadastroImovelApi(novoImovel, novoImovel.clienteId);
      navigate(`/imovel/${savedImovel.idImovel}`);
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      alert('Erro ao cadastrar o imóvel. Por favor, tente novamente.');
    }
  };

  return (
    <div className="pagina-cadastro-imovel">
      <h2 className="h2-cadastro-imovel">Cadastro de Imóvel</h2>
      <form className="conteudo-cadastro-imovel" onSubmit={cadastrarImovel}>
        <div>
          Selecione o tipo de imóvel:
          <label className="label-cadastro-imovel">
            <input
              type="radio"
              name="tipo"
              value={TipoImovel.REPUBLICA.toString()}
              checked={tipoImovel === TipoImovel.REPUBLICA}
              onChange={handleTipoImovelChange}
            />
            República
          </label>
          <label className="label-cadastro-imovel">
            <input
              type="radio"
              name="tipo"
              value={TipoImovel.APARTAMENTO.toString()}
              checked={tipoImovel === TipoImovel.APARTAMENTO}
              onChange={handleTipoImovelChange}
            />
            Apartamento
          </label>
          <label className="label-cadastro-imovel">
            <input
              type="radio"
              name="tipo"
              value={TipoImovel.CASA.toString()}
              checked={tipoImovel === TipoImovel.CASA}
              onChange={handleTipoImovelChange}
            />
            Casa
          </label>
        </div>

        <div>
          <label className="label-cadastro-imovel">Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="label-cadastro-imovel">Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="label-cadastro-imovel">Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="label-cadastro-imovel">Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="label-cadastro-imovel">Tamanho do Imóvel (m²):</label>
          <input
            type="number"
            name="tamanhoImovel"
            value={formData.tamanhoImovel || ''}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="label-cadastro-imovel">Número de Quartos:</label>
          <input
            type="number"
            name="numeroQuartos"
            value={formData.numeroQuartos || ''}
            onChange={handleInputChange}
          />
        </div>

        {tipoImovel === TipoImovel.REPUBLICA && (
          <div>
            <label className="label-cadastro-imovel">Número de Moradores na República:</label>
            <input
              type="number"
              name="numeroMoradoresRepublica"
              value={formData.numeroMoradoresRepublica || ''}
              onChange={handleInputChange}
            />
          </div>
        )}

        <button type="submit" className="button-cadastro-imovel">Cadastrar</button>
        <Link to="/home" className="botao-voltar-cadastro">Voltar</Link>
      </form>
    </div>
  );
};

export default CadastroImovel;
