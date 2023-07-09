import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
