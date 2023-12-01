import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import validator from 'validator';
import { MESSAGES } from '../../utils/constant';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.USER.VALIDATION.NAME.REQUIRED],
    maxlength: [50, MESSAGES.USER.VALIDATION.NAME.MIN_LENGTH],
    minlength: [2, MESSAGES.USER.VALIDATION.NAME.MAX_LENGTH],
    match: [/^[a-zA-Z\s]+$/, { message: MESSAGES.USER.VALIDATION.NAME.VALID }],
    validate: {
      validator: validator.matches,
      message: MESSAGES.USER.VALIDATION.NAME.VALID,
    },
  })
  name: string;

  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.USER.VALIDATION.EMAIL.REQUIRED],
    maxlength: [100, MESSAGES.USER.VALIDATION.EMAIL.MAX_LENGTH],
    validate: {
      validator: validator.isEmail,
      message: MESSAGES.USER.VALIDATION.EMAIL.IS_EMAIL,
    },
  })
  email: string;

  @Prop({
    // type: SchemaTypes.Date,
    required: [true, MESSAGES.USER.VALIDATION.ROLE.REQUIRED],
    type: SchemaTypes.String,
    enum: ['User', 'Admin'],
  })
  role: string;

  @Prop({
    type: SchemaTypes.String,
    // required: [true],
    default: 'en_US',
  })
  locale: string;

  @Prop({
    type: SchemaTypes.String,
    default: 'CHF',
  })
  currency: string;

  @Prop({
    type: SchemaTypes.String,
    required: [true, MESSAGES.USER.VALIDATION.PASSWORD.REQUIRED],
  })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any) {
  try {
    // check if it is modified
    if (!this.isModified('password')) {
      return next();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
