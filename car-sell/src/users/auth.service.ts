import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import * as buffer from 'buffer';
import { Roles } from '../guards/auth/roles.enum';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(email: string, password: string, role?: Roles) {
    const found = await this.userService.findOneBy({ email });
    if (found) {
      throw new BadRequestException('این ایمیل از قبل موجود است.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (
      (await scrypt(salt, password + salt, 16)) as buffer.Buffer
    ).toString('hex');

    return this.userService.create({
      email,
      password: hash + '.' + salt,
      role,
    });
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('نام کاربری یا رمز عبور اشباه است.');
    }

    const [hash, salt] = user.password.split('.');

    const calculatedHash = (
      (await scrypt(salt, password + salt, 16)) as buffer.Buffer
    ).toString('hex');

    if (hash !== calculatedHash)
      throw new BadRequestException('نام کاربری یا رمز عبور اشتباه است.');

    return user;
  }
}
