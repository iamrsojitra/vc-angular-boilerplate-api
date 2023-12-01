import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CreateForgetAuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
