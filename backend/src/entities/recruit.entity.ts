import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class Recruit {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Company, { eager: true })
  company: Company;

  @Column()
  position: string;

  @Column()
  description: string;

  @Column()
  stack: string;
}
