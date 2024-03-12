import { genSalt, hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @BeforeInsert()
  async hashPassword() {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    this.password = await hash(this.password, salt);
  }
  @Column()
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile

  @Column({ default: true })
  isActive: boolean;
}
