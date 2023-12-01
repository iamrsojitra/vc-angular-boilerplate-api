import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';
import { MESSAGES } from '../../utils/constant';

import validator from 'validator';

export type PartnerDocument = HydratedDocument<Partner>;

@Schema()
export class Partner {
  constructor() { }

  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.PARTNER.VALIDATION.EMAIL.REQUIRED],
    maxlength: [100, MESSAGES.PARTNER.VALIDATION.EMAIL.MAX_LENGTH],
    validate: {
      validator: validator.isEmail,
      message: MESSAGES.PARTNER.VALIDATION.EMAIL.IS_EMAIL,
    },
  })
  email: string;

  @Prop({
    type: SchemaTypes.Boolean,
    required: [true, MESSAGES.PARTNER.VALIDATION.IS_ACTIVE.REQUIRED],
  })
  isActive: boolean;

  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.PARTNER.VALIDATION.COMPANY_NAME.REQUIRED],
  })
  companyName: string;

  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.PARTNER.VALIDATION.NAME.REQUIRED],
  })
  name: string;

  @Prop({
    type: SchemaTypes.String,
  })
  webAddress: string;

  @Prop({
    type: SchemaTypes.String,
    // required: [true],
    default: 'en_US',
  })
  locale: string;

  @Prop({
    type: SchemaTypes.String,
    default: 'CHF',
    // required: [true],
  })
  currency: string;

  @Prop({
    type: {
      city: {
        type: SchemaTypes.String,
        required: [true, MESSAGES.PARTNER.VALIDATION.CITY.REQUIRED],
      },
      street: {
        type: SchemaTypes.String,
        required: [true, MESSAGES.PARTNER.VALIDATION.STREET.REQUIRED],
      },
      country: {
        type: SchemaTypes.String,
        required: [true, MESSAGES.PARTNER.VALIDATION.COUNTRY.REQUIRED],
      },
      zip: {
        type: SchemaTypes.String,
        required: [true, MESSAGES.PARTNER.VALIDATION.ZIP.REQUIRED],
      },
    },
    // required: [true, MESSAGES.PARTNER.VALIDATION.STREET.REQUIRED],
  })
  address: Object;

  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.PARTNER.VALIDATION.PHONE_NUMBER.REQUIRED],
  })
  phoneNo: string;

  @Prop({
    type: SchemaTypes.String,
    //  required: [true, MESSAGES.PARTNER.VALIDATION.EMAIL.REQUIRED],
  })
  uuid: string;

  @Prop({
    // type: SchemaTypes.Date,
    required: [true, MESSAGES.PARTNER.VALIDATION.USER.REQUIRED],
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  userId: ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;

  @Prop({
    type: SchemaTypes.Date,
    default: new Date(),
  })
  createdAt: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
