import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private usersService: UserService) {}

    @Get()
    findAll(@Res({ passthrough: true }) res: Response) {
       res.status(HttpStatus.OK).json(['success']);
    }

    // @Get()
    // async findAll(): Promise<User[]> {
    //     return this.usersService.findAll();
    // }

    // @Get()
    // async findAll() {
    //     try {
    //         await this.service.findAll()
    //     } catch (error) { 
    //         throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'This is a custom message',
    //         }, HttpStatus.FORBIDDEN, {
    //         cause: error
    //         });
    //     }
    // }

    @Get(':id')
    findOne(@Param('id') id: string): string {
      return `This action returns a #${id} cat`;
    }
    

    // @Post()
    // create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    //     res.status(HttpStatus.CREATED).send('created');
    // }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} cat`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `This action removes a #${id} cat`;
    }

}
