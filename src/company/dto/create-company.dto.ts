import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { IsString } from "class-validator";


export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    user: string;

}

