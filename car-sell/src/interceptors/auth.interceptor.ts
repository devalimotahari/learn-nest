import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();

    const userId = req.session.userId;

    if (userId) {
      req.user = await this.userService.findById(userId);
    }

    return next.handle();
  }
}
