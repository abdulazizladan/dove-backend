import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivityLogService } from './activity-log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly activityLogService: ActivityLogService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const { method, url, user } = request;

        return next.handle().pipe(
            tap(() => {
                if (user && user.userId) {
                    this.activityLogService.log(user.userId, `${method} ${url}`, `Request by ${user.username || 'user'}`);
                }
            }),
        );
    }
}
