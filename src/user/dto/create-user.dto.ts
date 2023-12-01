import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MESSAGES } from '../../utils/constant';

export class CreateUserDto {
  @IsNotEmpty({ message: MESSAGES.USER.VALIDATION.NAME.REQUIRED })
  @IsString({ message: MESSAGES.USER.VALIDATION.NAME.IS_ALPHA })
  @Matches(/^[a-zA-Z\s]+$/, { message: MESSAGES.USER.VALIDATION.NAME.VALID })
  name: string;

  @IsNotEmpty({ message: MESSAGES.USER.VALIDATION.EMAIL.REQUIRED })
  @IsEmail()
  email: string;

  @IsString({ message: MESSAGES.USER.VALIDATION.ROLE.IS_ALPHA })
  @IsNotEmpty({ message: MESSAGES.USER.VALIDATION.ROLE.REQUIRED })
  role: string;

  // @IsOptional()
  // @IsString()
  // uuid?: string;

  // @IsString({ message: MESSAGES.USER.VALIDATION.LAST_NAME.IS_ALPHA })
  @IsNotEmpty({ message: MESSAGES.USER.VALIDATION.PASSWORD.REQUIRED })
  password: string;
}

/*
 */
