import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Conta } from '../temp-delete/conta.entity';

@Entity()
export class Teste {
  @PrimaryGeneratedColumn()
  cliente_id: number;
}
