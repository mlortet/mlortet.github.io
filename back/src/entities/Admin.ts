// import * as bcrypt from "bcrypt";

//   @BeforeInsert()
//   async hashPassword() {
//     this.password = await bcrypt.hash(this.password, 10);
//   }

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
