import { Character } from 'src/character/entities/character.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  cost: number;

  @OneToOne(() => Character, (character) => character.property)
  @JoinColumn()
  owner: Character;

  @ManyToMany(() => Character, (character) => character.favPlaces)
  favCharacters: Character[];
}
