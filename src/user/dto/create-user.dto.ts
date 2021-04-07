import { IsDefined, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// used to pass data to database operations
// includes data validations
export class CreateUserDto {
  @ApiProperty({ default: `marwan.alhemeiri@tra.gov.ae` })
  @IsDefined()
  @IsString()
  @IsEmail()
  @Length(1, 100)
  readonly email: string;
}
