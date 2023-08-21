import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const matchRoles = (roles: any, user: any): any => {
  //logic auth role
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    if (!request.isAuthenticated()) {
      return false;
    }

    if (!roles) {
      return true;
    }

    if (roles.includes(request.user.role)) {
      return true;
    }
    return false;
  }
}
