import { Body, HttpStatus, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto';

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
}
