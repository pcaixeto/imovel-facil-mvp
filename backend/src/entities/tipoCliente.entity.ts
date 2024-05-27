import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('tb_tipo_cliente', { schema: 'public' })
export class TipoCliente {
  @PrimaryGeneratedColumn({ name: 'id_tipo_cliente' })
  idTipoCliente!: number;

  @Column({ name: 'tp_cliente' })
  tipoCliente!: string;

  @OneToMany(() => Cliente, (cliente) => cliente.tipoCliente)
  clientes!: Cliente[];
}
