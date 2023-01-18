import { CanActivate, ExecutionContext, UnauthorizedException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService:JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            // Тутм мы смотрим есть ли вообще требование проверять по роли
            // Те если мы в контроле используем наш кастомный декоратор @Roles('ADMIN')
            const requiredRoles =  this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])

            if (!requiredRoles) {
              return true;
            }

            // Стандартная проверка авторизавнного пользователя
            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
            }

            const user = this.jwtService.verify(token);
            request.user = user;
            
            // Проверка есть ли у юзера соответвующая роль
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        }
    }
    
}