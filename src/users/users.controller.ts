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
        console.log(createUsersDto);
        
        try {
            const newUser = await this.usersService.create(createUsersDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User has been created successfully',
                data: {
                    username: newUser.username
                }
            });
        } catch (err) {
            console.error('Error:', err);
    
            const status = err?.response?.statusCode || HttpStatus.BAD_REQUEST;
            const message = err?.response?.message || err;
            const error = err?.response?.error || 'Bad Request';
        
            return response.status(status).json({
                statusCode: status,
                message,
                error
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
            return response.status(error.status).json(error.response);
        }
    }

    @Get(':username')
    async findOne(@Res() response, @Param('username') username: string) {
        try {
            const user = await this.usersService.findOne(username);
            console.log('user', user);
            
            return response.status(HttpStatus.OK).json({
                message: "User found successfully",
                data: user
            })
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }

    @Patch(':username')
    async update(@Res() response, @Param('username') username: string, @Body() updateUsersDto: UpdateUsersDto) {
        try {
            const user = await this.usersService.update(username, updateUsersDto);
            
            return response.status(HttpStatus.OK).json({
                message: "User has been successfully updated",
                data: user
            })
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }

    @Delete(':username')
    async remove(@Res() response, @Param('username') username: string) {
        try {
            const deletedUser = await this.usersService.remove(username);

            return response.status(HttpStatus.OK).json({
                message: "User deleted successfully"
            })
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
}
