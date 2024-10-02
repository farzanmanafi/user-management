import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstname: string,
    lastname: string,
    zipcode?: string,
    phonenumber?: string,
  ): Promise<User | string> {
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      firstname,
      lastname,
      zipcode,
      phonenumber,
    });

    return this.userRepository.save(newUser);
  }
}
