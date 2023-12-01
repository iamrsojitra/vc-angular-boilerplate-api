import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { CommonService } from '../utils/services/common.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, //'secret',//jwtConstants.secret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CommonService, UserService, JwtStrategy],
})
export class AuthModule {}
