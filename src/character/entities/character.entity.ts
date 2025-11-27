import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column()
  employee: boolean;

  @OneToOne(() => Location, (location) => location.owner)
  property: Location;

  @ManyToMany(() => Location, (location) => location.favCharacters)
  @JoinTable()
  favPlaces: Location[];
}
