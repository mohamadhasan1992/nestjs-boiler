import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";




export class BaseCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class BaseUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class CreateUserDto {
    @ValidateNested()
    @Type(() => BaseUserDto)
    user: BaseUserDto;

    @ValidateNested()
    @Type(() => BaseCompanyDto)
    company: BaseCompanyDto;
}
