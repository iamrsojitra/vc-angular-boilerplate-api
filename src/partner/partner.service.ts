import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartner } from 'src/utils/interfaces/responce';
import { MESSAGES } from '../utils/constant';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner, PartnerDocument } from './schema/partner.schema';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const { email } = createPartnerDto;
    // check a user with that email
    const partner = await this.partnerModel.findOne({ email });
    // Check if user already exists
    if (partner) {
      // User already exists
      throw new ConflictException({
        message: MESSAGES.PARTNER.USER_ALREADY_EXIST,
      });
    }
    // Create the new user
    const createdUser = new this.partnerModel(createPartnerDto);
    // Save the new user
    await createdUser.save();

    // Return the saved user
    return createdUser;
  }

  async findOneById(id: number): Promise<CreatePartner> {
    // this.partnerModel.aggregate([
    //   {
    //     '$match': {
    //       '_id': new ObjectId('64a2925b19ad4ca32130196a')
    //     }
    //   }, {
    //     '$project': {
    //       'city': '$address.city',
    //       'country': '$address.country'
    //     }
    //   }
    // ]);
    const existingUser: CreatePartner = await this.partnerModel
      .findById(id)
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`Partner not found`);
    }
    return existingUser; //{ users: existingUser };
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  async update(id, updatePartnerDto?: UpdatePartnerDto) {
    // return `This action updates a #${id} partner`;
    const existingUser = await this.partnerModel.findByIdAndUpdate(
      id,
      updatePartnerDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`Partner #${id} not found`);
    }
    return existingUser;
  }
  async delete(id) {
    // return `This action updates a #${id} partner`;
    const existingUser = await this.partnerModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`Partner #${id} not found`);
    }
    return existingUser;
  }

  async findAllPartnerWithLimit(query) {
    const page = query.page || 1,
      limit = query.pageSize || 10,
      sort = query.sort,
      search = query.search || '';
    const partner = await this.partnerModel
      .find({
        // companyName: { $regex: [`^.${search}.*`] },
        userId: query.userId,
        // isDeleted: false,
        // companyName: { $regex: `^.${search}.*`, $options: 'i' }
      })
      .lean()
      .limit(limit * 1)
      .sort({ createdAt: sort === 'oldest' ? 1 : -1 })
      .skip((page - 1) * limit)
      .exec();
    const count = await this.partnerModel
      .find({
        // companyName: { $regex: [`^.${search}.*`] },
        userId: query.userId,
        // isDeleted: false,
        // companyName: { $regex: `^.${search}.*`, $options: 'i' }
      })
      .countDocuments()
      .exec();

    return {
      records: partner,
      totalCount: count, //Math.ceil(count / limit),
      currentPage: Number(page),
    };
  }
}
