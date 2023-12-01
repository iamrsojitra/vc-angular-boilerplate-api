import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import * as path from 'path';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { ApiResponse } from 'src/utils/interfaces/responce';
import { MESSAGES } from '../utils/constant';
import { CommonService } from '../utils/services/common.service';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateForgetAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) { }

  @Post('/login')
  // find the user based on the input data
  async login(@Body() userDTO: CreateAuthDto): Promise<ApiResponse> {
    const user: User = await this.userService.findByCredential(userDTO);
    // define a payload
    const payload = {
      email: user['email'],
      id: user['_id'].toString(),
    };
    //get a JWT authentication token from the payload
    const token = await this.authService.signJWTTokenPayload(payload);
    const resObj = { ...user, token };
    // delete existingUser['password'];
    return {
      status: HttpStatus.OK,
      message: MESSAGES.AUTH.LOGGED_IN_SUCCESS,
      data: resObj,
      error: null,
    };
  }

  @Post('/forgotPassword')
  async forgetPassword(
    @Req() request: Request,
    @Body() updateUserDto: CreateForgetAuthDto,
  ): Promise<ApiResponse> {
    console.log(updateUserDto)
    const isExistUser = await this.userService.findByField({
      email: updateUserDto.email,
    });
    try {
      const encrypted = await this.commonService.encryptUsingAES256(
        isExistUser.id,
      );
      const targetUrl = `${process.env.LOCAL_TARGET_URL}/auth/reset-password?token=${encrypted}`;
      const sendEmailData = {
        isExistUser: isExistUser,
        targetUrl: targetUrl,
        subject: 'Reset Password ✔',
        template: path.join(
          process.cwd(),
          'dist',
          'templates',
          `reset-password-email-template.ejs`,
        ),
        context: {
          target_url: targetUrl,
          ...isExistUser.toJSON(),
        },
      };
      const mailresp = await this.commonService.sendMail(sendEmailData);
      console.log("mailresp", mailresp);
      return {
        message: MESSAGES.AUTH.FORGET_PASSWORD_SENT_MAIL_SUCCESS,
        status: HttpStatus.CREATED,
        error: null,
      };
    } catch (error) {
      console.log("error", error);
      throw new InternalServerErrorException({
        message: error.errors[Object.keys(error.errors)[0]].message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
      });
    }
    // }
  }

  @Put('/resetPassword')
  async update(@Body() updateUserDto: UpdateAuthDto): Promise<ApiResponse> {
    try {
      const id = this.commonService.decryptUsingAES256(updateUserDto.id);
      updateUserDto.id = id;
      updateUserDto.password = this.commonService.encryptUsingAES256(
        updateUserDto.password,
      );
      await this.userService.update(
        JSON.parse(updateUserDto.id),
        updateUserDto,
      );
      return {
        message: MESSAGES.AUTH.PASSWORD_UPDATED_SUCCESS,
        status: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException({
          message: MESSAGES.ERROR.NOT_FOUND,
          status: HttpStatus.NOT_FOUND,
          success: false,
        });
      }
      throw new InternalServerErrorException({
        message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
      });
    }
  }
}
