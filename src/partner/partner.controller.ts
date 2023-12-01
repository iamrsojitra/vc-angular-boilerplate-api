import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from 'src/utils/interfaces/responce';
import { MESSAGES } from '../utils/constant';
import { CommonService } from '../utils/services/common.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerService } from './partner.service';

@Controller('partner')
@UseGuards(AuthGuard('jwt'))
export class PartnerController {
  constructor(
    private readonly partnerService: PartnerService,
    private readonly commonService: CommonService,
    private readonly partnerSevice: PartnerService,
  ) {}

  @Post()
  async create(@Body() createPartnerDto: CreatePartnerDto) {
    // return this.partnerService.create(createPartnerDto);
    createPartnerDto.uuid = this.commonService.generateUUID();

    // return createUserDto
    try {
      const partnerData = await this.partnerSevice.create(createPartnerDto);
      return {
        message: MESSAGES.PARTNER.USER_CREATED_SUCCESSFULLY,
        status: HttpStatus.CREATED,
        success: true,
        data: partnerData,
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw new ConflictException({
          message: MESSAGES.PARTNER.USER_ALREADY_EXIST,
          status: HttpStatus.CONFLICT,
        });
      }
      throw new InternalServerErrorException({
        message: error.errors[Object.keys(error.errors)[0]].message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() body): Promise<ApiResponse> {
    // return this.userService.findAll();
    try {
      const userData = await this.partnerService.findAllPartnerWithLimit(body);
      return {
        message: MESSAGES.USER.USER_LIST_LOADED_SUCCESS,
        data: userData,
        status: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<ApiResponse> {
    // return this.userService.findOne(+id);
    try {
      const userData = await this.partnerService.findOneById(id);
      return {
        message: MESSAGES.USER.USER_DETAIL_LOADED_SUCCESS,
        data: userData,
        status: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      // return response.status(err.status).json(err.response);
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

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ): Promise<ApiResponse> {
    // return this.partnerService.update(+id, updatePartnerDto);
    try {
      const userData = await this.partnerService.update(id, updatePartnerDto);
      return {
        message: MESSAGES.PARTNER.USER_UPDATED_SUCCESS,
        data: userData,
        status: HttpStatus.OK,
        error: null,
      };
    } catch (error) {
      // return response.status(err.status).json(err.response);

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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ApiResponse> {
    // return this.partnerService.update(+id, updatePartnerDto);
    try {
      const userData = await this.partnerService.delete(id);
      return {
        message: MESSAGES.PARTNER.USER_DELETED_SUCCESS,
        data: userData,
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
