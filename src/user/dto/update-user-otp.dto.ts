import { IsInt, ValidateNested, IsDefined, IsString, IsEmail, Length, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

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
