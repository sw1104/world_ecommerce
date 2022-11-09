import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dto/userSignUp.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async userSignUp(userSignUpDto: UserSignUpDto) {
    const { email } = userSignUpDto;
    const duplicate = await this.isExistByEmail(email);
    if (duplicate) throw new BadRequestException('중복된 이메일 입니다.');
    userSignUpDto.password = await this.hashedPassword(userSignUpDto.password);
    return await this.createUser(userSignUpDto);
  }

  async isExistByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }

  async createUser(userSignUpDto: UserSignUpDto) {
    const registerUser = new this.userModel(userSignUpDto);
    registerUser.save();
  }

  async hashedPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
}
