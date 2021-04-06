import { CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';

export class SessionGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        try {
            if (request.session.passport.user) {
                return true;
            }
        } catch (e) {
            // throw new HttpException('Incorrect credentials', HttpStatus.UNAUTHORIZED);
            throw new UnauthorizedException();
        }

    }
}
