import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import * as path from 'path';

import { ApiResponse } from 'src/utils/interfaces/responce';
import { MESSAGES } from '../utils/constant';
import { CommonService } from '../utils/services/common.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse> {
    // createUserDto.uuid = this.commonService.generateUUID();
    createUserDto.password = this.commonService.encryptUsingAES256(
      createUserDto.password,
    );
    // return createUserDto
    try {
      const userData = await this.userService.create(createUserDto);
      // return response;
      const encrypted = await this.commonService.encryptUsingAES256(
        userData.id,
      );
      // console.log(request.headers['origin'])
      const targetUrl = `${process.env.LOCAL_TARGET_URL}/auth/generate-password?id=${encrypted}`;

      const sendEmailData = {
        isExistUser: createUserDto,
        targetUrl: targetUrl,
        subject: 'Plain Text Email ✔',
        template: path.join(
          process.cwd(),
          'dist',
          'templates',
          `register-confirm-mail.ejs`,
        ),
        context: {
          target_url: targetUrl,
          ...createUserDto,
        },
      };
      await this.commonService.sendMail(sendEmailData);
      return {
        message: MESSAGES.USER.USER_CREATED_SUCCESSFULLY,
        status: HttpStatus.CREATED,
        error: null,
        data: userData,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw new ConflictException({
          message: MESSAGES.USER.USER_ALREADY_EXIST,
          status: HttpStatus.CONFLICT,
          error: error.message,
          data: [],
        });
      }

      throw new BadRequestException({
        message: error.errors[Object.keys(error.errors)[0]].message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
        data: [],
      });
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
