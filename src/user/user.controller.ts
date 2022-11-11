import {
  Body,
  HttpStatus,
  Controller,
  Post,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { Seller } from './dto/seller.dto';
import { GetUserEmail } from './decorator/userEmail.decorator';

export class JwtAuthGuard extends AuthGuard('jwt') {}
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    await this.userService.userSignUp(userSignUpDto);
    return { status: HttpStatus.CREATED, message: '회원가입 성공' };
  }

  @Post('/signin')
  async userSignIn(@Body() userSignInDto: UserSignInDto) {
    const token = await this.userService.userSignIn(userSignInDto);
    return { status: HttpStatus.OK, token };
  }

  @Patch('/seller/register')
  @UseGuards(AuthGuard())
  async registerSeller(@GetUserEmail() email: string, @Body() seller: Seller) {
    await this.userService.registerSeller(email, seller);
    return { status: HttpStatus.OK, message: '셀러 등록 성공' };
  }

  @Post('/test')
  @UseGuards(JwtAuthGuard)
  async test(@Req() req) {
    console.log(req);
  }
}
