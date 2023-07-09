import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): NonNullable<unknown>;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    // this code run before a request

    return next.handle().pipe(
      map((value) => {
        return plainToInstance(this.dto, value, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
