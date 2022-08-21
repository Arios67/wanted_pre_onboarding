import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Recruit } from "./recruit.entity";

@Entity()
export class Apply {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Recruit)
  recruit: Recruit;
}
