import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from '../profile/profile.entity';
import { User } from './user.entity';

import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class UsersService {

  // private readonly users = [
  //   {
  //     id: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     id: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) { }

  async create(createRegisterDto: CreateRegisterDto): Promise<User> {
    const profile = new Profile();
    profile.firstname = createRegisterDto.username;
    profile.lastname = createRegisterDto.password;
    profile.gender = createRegisterDto.gender;
    profile.photo = createRegisterDto.photo;
    await this.profilesRepository.save(profile);

    const user = new User();
    user.username = createRegisterDto.username;
    user.password = createRegisterDto.password;
    user.profile = profile;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['profile'], loadRelationIds: false });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username: username })
  }
}
