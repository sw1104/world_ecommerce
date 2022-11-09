import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { NotIn } from '../decorator/notIn.decorator';
export class UserSignUpDto {
  id: string;
  @IsString()
  @NotIn('password', { message: '비밀번호에는 이름이 포함되면 안됩니다.' })
  @MinLength(2)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: '비밀번호 형식이 맞지 않습니다.',
  })
  password: string;
  phone: string;
}
