import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { MESSAGES } from '../utils/constant';

import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { CommonService } from '../utils/services/common.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly commonService: CommonService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    // get email from the input
    const { email } = createUserDto;
    // check a user with that email
    const user = await this.userModel.findOne({ email });
    // Check if user already exists
    if (user) {
      // User already exists
      throw new ConflictException({
        // message: MESSAGES.AUTH.USER_NOT_EXIST,
        message: MESSAGES.AUTH.USER_NOT_EXIST,
        error: HttpStatus.NOT_FOUND,
      });
    }
    // Create the new user
    const createdUser = new this.userModel(createUserDto);
    // Save the new user
    await createdUser.save();

    // Return the saved user
    return createdUser;
  }

  async findByField(fields) {
    // return await this.userModel.findOne(fields).populate('role').exec();

    const user = await this.userModel.findOne(fields).populate('role').exec();
    // Check if user already exists
    if (!user) {
      // User already exists
      // throw new NotFoundException(MESSAGES.AUTH.USER_NOT_EXIST);
      throw new NotFoundException({
        message: MESSAGES.AUTH.USER_NOT_EXIST,
        status: HttpStatus.NOT_FOUND,
        data: [],
        error: MESSAGES.AUTH.USER_NOT_EXIST,
      });
    }

    // Return the saved user
    return user;
  }

  async findByCredential(userDTO: CreateAuthDto): Promise<User> {
    const { email, password } = userDTO; // Get the email and password.
    // find user by email
    // const user = await this.userModel.findOne({ email }).populate('role').lean();
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .populate('role')
      .lean();

    if (!user) {
      // Check if user exists
      // User not found
      // new NotFoundException("Invalid Credentials")
      throw new NotFoundException('Invalid credentials');
    }
    // check if password is correct

    if (user['password'] !== this.commonService.encryptUsingAES256(password)) {
      // Invalid credentials
      throw new BadRequestException('Invalid credentials');
    }

    // return the user
    delete user['password'];
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;

    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate('role');
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }
}
