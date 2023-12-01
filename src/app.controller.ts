import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonService } from './utils/services/common.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly commonService: CommonService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('enc')
  encryptData(@Res() res): string {
    const str = '64ca34385290529199ddc60c';
    console.log(
      'this.commonService.encryptUsingAES256(str)',
      this.commonService.encryptUsingAES256(str),
    );

    return this.commonService.encryptUsingAES256(str);
  }

  @Get('enc')
  decryptData(@Res() res): string {
    const str = 'Xjyf FiNuwY6hQ5MKq4sq0gg%2FFMICnogA0LjZuJD1vT43D';
    console.log(
      'this.commonService.decryptUsingAES256(str)',
      this.commonService.decryptUsingAES256(str),
    );
    return this.commonService.decryptUsingAES256(str);
  }
}
