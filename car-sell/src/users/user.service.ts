import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../guards/auth/roles.enum';

@Injectable()
export class UserService {
  private readonly NOT_FOUND_MESSAGE = 'کاربر مورد نظر یافت نشد.';

  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(user: { email: string; password: string; role?: Roles }) {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }

  findAll(select?: FindOptionsSelect<User>) {
    return this.repository.find({
      ...(select ? { select: { ...select, id: true } } : undefined),
    });
  }

  async findById(id: number) {
    const found = await this.repository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(this.NOT_FOUND_MESSAGE);
    }
    return found;
  }

  async findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return await this.repository.findOne({ where });
  }

  findAllBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.repository.find({ where });
  }

  async update(id: number, attrs: Omit<Partial<User>, 'id'>) {
    const obj = await this.findById(id);
    if (!obj) {
      throw new NotFoundException(this.NOT_FOUND_MESSAGE);
    }

    Object.assign(obj, attrs);
    return this.repository.save(obj);
  }

  async remove(id: number) {
    const obj = await this.findById(id);
    if (!obj) {
      throw new NotFoundException(this.NOT_FOUND_MESSAGE);
    }

    return this.repository.remove(obj);
  }
}
