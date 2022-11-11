import { IsEmail, IsString, Matches } from 'class-validator';

export class UserSignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: '비밀번호 형식이 맞지 않습니다.',
  })
  password: string;
}
