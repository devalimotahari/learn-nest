import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
} from '@nestjs/common';
import { UserCreateDto } from './dtos/user.create.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serializer.interceptor';
import { AuthService } from './auth.service';
import { SessionT } from '../_types/session.type';
import { SessionUser } from '../decorators/sessionUser.decorator';
import { User } from './user.entity';
import { RoleGuard } from '../guards/auth/auth.guard';
import { Roles } from '../guards/auth/roles.enum';
import { UserUpdateRoleDto } from './dtos/user.updateRole.dto';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(private service: UserService, private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: UserCreateDto, @Session() session: SessionT) {
    if (session.userId) {
      throw new BadRequestException('شما از قبل وارد شده اید!');
    }
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: UserCreateDto, @Session() session: SessionT) {
    if (session.userId) {
      throw new BadRequestException('شما از قبل وارد شده اید!');
    }
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @RoleGuard()
  @Post('/signout')
  async signOut(@Session() session: SessionT) {
    session.userId = null;
  }

  @RoleGuard()
  @Get('/whoami')
  whoAmI(@SessionUser() user: User) {
    return user;
  }

  @RoleGuard([Roles.Admin, Roles.SuperAdmin])
  @Get('/list')
  list() {
    return this.service.findAll();
  }

  @RoleGuard([Roles.Admin, Roles.SuperAdmin])
  @Get()
  async getByMail(@Query('email') email: string) {
    const user = await this.service.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('کاربر یافت نشد.');
    }
    return user;
  }

  @RoleGuard([Roles.Admin, Roles.SuperAdmin])
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findById(+id);
  }

  @RoleGuard([Roles.Admin, Roles.SuperAdmin])
  @Put('/:id')
  edit(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this.service.update(+id, body);
  }

  @RoleGuard([Roles.Admin, Roles.SuperAdmin])
  @Patch('/:id')
  updateRole(@Param('id') id: string, @Body() body: UserUpdateRoleDto) {
    return this.service.update(+id, body);
  }

  @RoleGuard([Roles.Admin, Roles.SuperAdmin])
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
