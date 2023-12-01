import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signJWTTokenPayload(payload: any) {
    // token to expire in 12 hours
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    return token;
  }

  async findByField(fields) {
    return await this.userModel.findOne(fields).populate('role').exec();
  }
}
