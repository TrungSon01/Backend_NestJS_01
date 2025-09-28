import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from 'src/common/constant/app.constant';
// đầu vào
@Injectable()
export class ProtecthGuard extends AuthGuard('protect') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here

    // for example, call super.logIn(request) to establish a session.
    console.log('canActivate - ProtecthGuard');
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    console.log({ isPublic });
    if (isPublic) {
      return true;
    }
    // return true; // ko cần kiểm thì return true
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // err loi cua he thong
    // info loi thu vien  throw ra
    console.log('handleRequest - ProtecthGuard', { err, user, info });
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new ForbiddenException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
