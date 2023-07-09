import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serializer.interceptor';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(private service: UserService) {}

  @Post('/signup')
  create(@Body() body: UserCreateDto) {
    return this.service.create(body.email, body.password);
  }

  @Get('/list')
  list() {
    return this.service.findAll();
  }

  @Get()
  getByMail(@Query('email') email: string) {
    return this.service.findOneBy({ email });
  }

  @Serialize(UserDto)
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.service.findById(+id);
  }

  @Serialize(UserDto)
  @Put('/:id')
  edit(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this.service.update(+id, body);
  }

  @Serialize(UserDto)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
