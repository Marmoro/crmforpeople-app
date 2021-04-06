import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, IsEmail, Length, IsNumber } from "class-validator";

export class VerifyLoginDTO {

    @ApiProperty({ default: `${(Math.random() * 5).toString(16)}@hotmail.com`})
    @IsDefined()
    @IsString()
    @IsEmail()
    @Length(1, 100)
    readonly email: string;

    @ApiProperty({ default: 123456})
    @IsDefined()
    @IsString()
    @Length(1, 100)
    readonly password: string;
}
