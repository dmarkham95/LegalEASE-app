import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  query!: string;

  @Column()
  searchDate!: Date;
}
