import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserCredentialsDto } from './dto/update-user-otp.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { TokenPayload } from './interfaces/token-payload.interface';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async logIn(createUserDto: CreateUserDto) {
    const tokenPayload: TokenPayload = await this.generateToken();

    if ((await this.count(createUserDto.email)) === 0) {
      await this.userRepository.save(createUserDto);
    }

    const updateUserCredentialsDto: UpdateUserCredentialsDto = {
      email: createUserDto.email,
      password: tokenPayload.hashedpassword,
    };
    await this.updateOtp(updateUserCredentialsDto);

    // Return the number to the user
    const result = {
      password: tokenPayload.unhashedpassword,
    };
    return result;
  }

  async verifyLogin(email: string, password: string) {
    // Check if user exists or throw exception
    const user: User = await this.findOne(email);
    if (!user || !user.password) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }
    // Check if user password is correct or throw exception
    const match = await argon2.verify(user.password, password);
    if (!match) {
      throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
    }

    // User exists and password is correct
    // give user a session
    const result = {
      userId: user.id,
      email: user.email,
      roles: user.roles,
    };
    return result;
  }

  async validateUser(email, password) {
    const user = await this.findOne(email);
    const match = await argon2.verify(user.password, password);

    if (!user || !user.password) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    if (!match) {
      throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
    }

    type partialUserType = Omit<User, 'password'>;
    const UserProps: partialUserType = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    };

    return UserProps;
  }

  async updateOtp(updateUserCredentialsDto: UpdateUserCredentialsDto) {
    return await this.userRepository.update(
      { email: updateUserCredentialsDto.email },
      updateUserCredentialsDto,
    );
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async count(email: string): Promise<number> {
    return await this.userRepository.count({ where: { email } });

    // if (isUserExists !== 0) {
    //   throw new HttpException('User already exists.', HttpStatus.FORBIDDEN);
    // }
  }

  private async generateToken(): Promise<TokenPayload> {
    const salt = randomBytes(32);

    // Generate Token Number to be sent to the user
    const password = Math.floor(100000 + Math.random() * 900000);

    // Generate a hash of the token number
    const hash = await argon2.hash(password.toString(), { salt });

    const result: TokenPayload = {
      unhashedpassword: password.toString(),
      hashedpassword: hash,
    };

    return result;
  }
}
