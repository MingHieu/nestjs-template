import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        if (Object.keys(req.body).length != 0) {
          console.log(
            new Date().toLocaleString(),
            req.method,
            req.url,
            `${Date.now() - now}ms`,
            req.body,
          );
        } else {
          console.log(
            new Date().toLocaleString(),
            req.method,
            req.url,
            `${Date.now() - now}ms`,
          );
        }
      }),
    );
  }
}
