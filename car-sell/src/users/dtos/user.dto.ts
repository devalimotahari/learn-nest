import { Expose } from 'class-transformer';
import { Roles } from '../../guards/auth/roles.enum';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  role: Roles;
}
