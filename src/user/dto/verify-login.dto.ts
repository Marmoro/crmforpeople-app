import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsEmail, Length } from 'class-validator';

export class VerifyLoginDTO {
  @ApiProperty({ default: `marwan.alhemeiri@tra.gov.ae` })
  @IsDefined()
  @IsString()
  @IsEmail()
  @Length(1, 100)
  readonly email: string;

  @ApiProperty({ default: 123456 })
  @IsDefined()
  @IsString()
  @Length(1, 100)
  readonly password: string;
}
