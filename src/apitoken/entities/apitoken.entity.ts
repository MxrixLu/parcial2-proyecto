//Para crear, desactivar tokens y contar cuantas peticiones restantes tiene
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apitoken')
export class Apitoken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  token: string;

  @Column('bool', {
    default: true,
  })
  active: boolean;

  @Column('int', {
    default: 10,
  })
  reqLeft: number;
}
