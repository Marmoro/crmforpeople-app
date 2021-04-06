import { IsInt, ValidateNested, IsDefined, IsString, IsEmail, Length, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// used to pass data to database operations
// includes data validations
export class CreateUserDto {

    @ApiProperty({ default: `${(Math.random() * 5).toString(16)}@hotmail.com`})
    @IsDefined()
    @IsString()
    @IsEmail()
    @Length(1, 100)
    readonly email: string;
}
