import { Roles } from './roles.enum';
import { User } from '../../users/user.entity';

export default function matchRoles(user: User, roles: Roles[]) {
  return roles.includes(user.role);
}
