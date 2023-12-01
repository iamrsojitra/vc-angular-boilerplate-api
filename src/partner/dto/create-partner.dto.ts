import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MESSAGES } from '../../utils/constant';

export class CreatePartnerDto {
  @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.EMAIL.REQUIRED })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  isActive: boolean;

  @IsOptional()
  @IsString()
  uuid?: string;

  @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.COMPANY_NAME.REQUIRED })
  companyName: string;

  @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.NAME.REQUIRED })
  name: string;

  @IsOptional()
  webAddress: string;

  // @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.STREET.REQUIRED })
  // street: string;

  // @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.CITY.REQUIRED })
  // city: string;

  // @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.ZIP.REQUIRED })
  // zip: string;

  // @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.COUNTRY.REQUIRED })
  // country: string;

  @IsNotEmpty({ message: MESSAGES.PARTNER.VALIDATION.PHONE_NUMBER.REQUIRED })
  phoneNo: string;
}
