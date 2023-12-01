import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommonService {
  constructor(private mailService: MailerService) { }
  encryptUsingAES256(myPlaintextPassword: string) {
    const _key = CryptoJS.enc.Utf8.parse(process.env.TOKEN_FROM_UI);
    const _iv = CryptoJS.enc.Utf8.parse(process.env.TOKEN_FROM_UI);
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(myPlaintextPassword),
      _key,
      {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return encrypted.toString();
  }

  decryptUsingAES256(encrypted): string {
    const _key = CryptoJS.enc.Utf8.parse(process.env.TOKEN_FROM_UI);
    const _iv = CryptoJS.enc.Utf8.parse(process.env.TOKEN_FROM_UI);

    const decrypted = CryptoJS.AES.decrypt(encrypted, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  async sendMail(data) {
    let obj = {
      to: data.isExistUser.email,
      from: 'megha.parmar@viitor.cloud',
      // from: 'megha.d.parmar2018@gmail.com',
      subject: data.subject, //'Reset Password ✔',
      text: 'Welcome NestJS Email Sending Tutorial',
      // template: 'email',
      template: data.template,
      context: { ...data.context },
    }
    console.log("obj=>", obj);
    return await this.mailService.sendMail(obj);
  }

  generateUUID(): string {
    const uuid = uuidv4();
    return uuid;
  }
}
