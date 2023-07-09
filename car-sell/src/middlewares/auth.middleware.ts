import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private usersService: UserService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findById(userId);
      req.user = user;
    }

    next();
  }
}
