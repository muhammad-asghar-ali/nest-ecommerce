import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    const { method, url } = req;

    return call$.handle().pipe(
      tap(() => {
        Logger.log(
          `${method} ${url} ${Date.now() - now}ms`,
          context.getClass().name,
        );
      }),
    );
  }
}
