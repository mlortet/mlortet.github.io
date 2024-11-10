import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  username!: string;

  @Column("varchar")
  password!: string;

  // Avant d'insérer un admin, on hache le mot de passe
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
