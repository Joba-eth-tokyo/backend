import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(createUserDto: UsersDTO): Promise<User> {
    const user = new User();

    user.display_name = createUserDto.display_name;
    user.email = createUserDto.email;
    user.wallet_address = createUserDto.wallet_address;
    user.profile_photo = createUserDto.profile_photo;
    user.telegram_user_link = createUserDto.telegram_user_link;
    user.phone = createUserDto.phone;
    user.residential_address = createUserDto.residential_address;
    user.is_signup_completed = createUserDto.is_signup_completed;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({
      email,
    });
  }

  findOneByAddres(wallet_address: string): Promise<User | null> {
    return this.usersRepository.findOne({
      wallet_address,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, updateUserDto: UpdateUserDTO): Promise<any> {
    const response = await this.usersRepository.update(id, updateUserDto);
    return response;
  }
}
