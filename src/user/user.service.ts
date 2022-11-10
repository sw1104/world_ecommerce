import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dto/payload.dto';
import { Seller } from './dto/seller.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
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

  async userSignIn(
    userSignInDto: UserSignInDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = userSignInDto;
    const user = await this.isExistByEmail(email);
    const payload: Payload = { email };
    const accessToken = await this.jwtService.sign(payload);

    if (user && (await bcrypt.compare(password, user.password))) {
      return { accessToken };
    } else {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인하세요.');
    }
  }

  async registerSeller(email: string, seller: Seller) {
    return await this.userModel.updateOne({ email: email }, { seller: seller });
  }
}
