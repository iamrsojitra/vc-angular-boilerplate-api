import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // define auth service and extract jwt token from header
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    // Get user from payload
    // const user = await this.authService.validateUser(payload);
    const user = await this.userService.findByField({ email: payload.email });
    // If no user return unauthorized response
    if (!user) {
      return done(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
    }
    // else, return successful response with the user data
    return done(null, user, payload.iat);
  }
}
