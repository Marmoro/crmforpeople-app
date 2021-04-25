import { IsDefined, IsString, IsEmail, Length } from 'class-validator';

// used to pass data to database operations
// includes data validations
export class UpdateUserCredentialsDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  @Length(1, 100)
  readonly email: string;

  @IsDefined()
  @IsString()
  @Length(1, 100)
  readonly password: string;
}
