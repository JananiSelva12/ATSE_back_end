import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Projects extends BaseEntity {
  @Column({ nullable: true, type: "varchar", length: 100 })
  name: string;

  @Column({ nullable: true, type: "varchar", length: 255 })
  address: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  project_type: string;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  @Column()
  employer_id: number;

}
