import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  first_name: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  last_name: string;

  @Column({ nullable: true, type: "varchar", length: 100 })
  crypted_password: string;

  @Column({ nullable: true, default: false })
  is_marketing: boolean;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  phoneNo: string;

  @Column({ nullable: true })
  verificationToken: string;

  @Column({ nullable: false, default: false })
  verified: boolean;

  @Column({ default: true })
  isActivated: boolean;

  @Column({ default: false })
  ownerAccount: boolean;
}
