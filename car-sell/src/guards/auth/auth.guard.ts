import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Roles } from './roles.enum';
import { User } from '../../users/user.entity';
import matchRoles from './matchRoles';
import { Reflector } from '@nestjs/core';

export function RoleGuard(roles?: Roles[] | Roles) {
  let parsedRoles = [Roles.Client, Roles.Admin, Roles.SuperAdmin];
  if (roles) {
    if (Array.isArray(roles)) {
      parsedRoles = roles;
    } else {
      parsedRoles = [roles];
    }
  }
  return SetMetadata('roles', parsedRoles);
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user as User | undefined;
    if (!user) return false;

    return matchRoles(user, roles);
  }
}
