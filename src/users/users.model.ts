import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}


@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индификатор'})
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'some@mail.ru', description: 'Почтовый адрес'})
    @Column({ type: DataTypes.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({ example: '123456', description: 'Пароль пользователся'})
    @Column({ type: DataTypes.STRING, allowNull: false})
    password: string;

    @ApiProperty({ example: 'true', description: 'Забанен пользователь или нет'})
    @Column({ type: DataTypes.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({ example: 'Писал маты', description: 'Причина блокироваки'})
    @Column({ type: DataTypes.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}