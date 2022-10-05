import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getByUsername(username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username: username });

      if (!user) {
        throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.getStatus());
    }
  }

  async getById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id_user: id,
        },
      });

      if (!user) {
        throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);
      }

      delete user?.password;

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
