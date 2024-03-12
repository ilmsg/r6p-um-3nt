import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile

  @Column({ default: true })
  isActive: boolean;
}
