import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

}