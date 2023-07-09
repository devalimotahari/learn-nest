import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../guards/auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: Roles.Client,
  })
  role: Roles;
}
