import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Res() response, @Body() createUsersDto: CreateUsersDto) {
        try {
            const newUser = await this.usersService.create(createUsersDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                data: {
                    username: newUser.username
                }
            });
        } catch (err) {
            const status = err.response.statusCode;
            const message = err.response.message;
            const error = err.response.err;

            return response.status(status ?? HttpStatus.BAD_REQUEST).json({
            statusCode: status ?? 400,
            message: message ?? err,
            error: error ?? 'Bad Request'
            });
        }
    }

    @Get()
    async findAll(@Res() response) {
        try {
            const data = await this.usersService.findAll();

            return response.status(HttpStatus.OK).json({
                message: "All users data found successfully",
                data
            });
        } catch (error) {
            
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUsersDto: UpdateUsersDto) {
        return this.usersService.update(+id, updateUsersDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
