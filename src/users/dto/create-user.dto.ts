import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Не корректный email' })
    readonly email: string;

    @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
    @IsString({ message: 'Должно быть строкой' })
    @Length(4, 16, { message: 'Пароль должен быть не меньше 4 и не больше 16' })
    readonly password: string;
}