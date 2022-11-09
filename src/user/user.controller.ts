import { Body, HttpStatus, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignUpDto } from './dto/userSignUp.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async userSignUp(@Body() userSignUpDto: UserSignUpDto) {
    await this.userService.userSignUp(userSignUpDto);
    return { status: HttpStatus.CREATED, message: '회원가입 성공' };
  }
}
