import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private readonly NOT_FOUND_MESSAGE = 'کاربر مورد نظر یافت نشد.';

  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(email: string, password: string) {
    const found = await this.repository.findOne({ where: { email } });
    if (found) {
      throw new ConflictException('این ایمیل از قبل موجود است.');
    }

    const user = this.repository.create({ email, password });
    return this.repository.save(user);
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
    const obj = await this.repository.findOne({ where });
    if (!obj) {
      throw new NotFoundException(this.NOT_FOUND_MESSAGE);
    }
    return obj;
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
