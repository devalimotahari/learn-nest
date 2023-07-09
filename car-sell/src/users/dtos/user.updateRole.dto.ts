import { IsEnum } from 'class-validator';
import { Roles } from '../../guards/auth/roles.enum';

export class UserUpdateRoleDto {
  @IsEnum(Roles)
  role: Roles;
}
