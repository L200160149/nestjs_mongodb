import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsersDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    password: string;
}