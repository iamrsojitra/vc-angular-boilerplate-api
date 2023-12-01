import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonService } from '../utils/services/common.service';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { Partner, PartnerSchema } from './schema/partner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService, CommonService],
})
export class PartnerModule {}
