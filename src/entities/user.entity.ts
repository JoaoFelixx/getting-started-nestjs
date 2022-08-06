import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface User {
  _id: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('users')
export class Users implements Required<User> {
  @PrimaryColumn()
  _id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
