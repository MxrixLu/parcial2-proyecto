import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number; // auto incrementado

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column()
  employee: boolean;

  @OneToOne(() => Location, (location) => location.owner)
  property: Location;

  @ManyToOne(() => Location, (location) => location.favCharacters)
  favPlaces: Location[];
}
