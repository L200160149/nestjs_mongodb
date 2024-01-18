import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import {hash} from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

    async create(createUsersDto: CreateUsersDto): Promise<Users> {
        const { username, password } = createUsersDto;

        // Check if a user with the same username already exists
        const existingUser = await this.usersModel.findOne({ username }).exec();
        
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const hashedPassword = await hash(password, 10);
    
        // Create and save the new user
        const newUser = new this.usersModel({ username, password: hashedPassword });
        
        return newUser.save();
    }
    
    async findAll(): Promise<any[]> {
        const users = await this.usersModel.find().exec();

        if (!users || users.length === 0) {
            throw new NotFoundException('Users data not found!');
        }

        return users;
    }

    async findOne(username: string): Promise<Users> {
        const user = await this.usersModel.findOne({username}).exec();
        
        if (!user) {
            throw new NotFoundException(`User #${username} not found`);
        }

        return user;
    }

    async update(username: string, updateUsersDto: UpdateUsersDto): Promise<Users> {
        const existingUser = await this.usersModel.findOne({username: updateUsersDto.username}).exec();
        if (existingUser) {
            throw new ConflictException(`User #${updateUsersDto.username} already exists`);
        }

        const hashedPassword = await hash(updateUsersDto.password, 10);
    
        updateUsersDto.password = hashedPassword;

        const user = await this.usersModel.findOneAndUpdate({username}, updateUsersDto, {new: true});
        if (!user) {
            throw new NotFoundException(`User #${username} not found`)
        }

        return user;
    }

    async remove(username: string) {
        const user = await this.usersModel.findOneAndDelete({username});

        if (!user) {
            throw new NotFoundException(`User #${username} not found`);
        }

        return user;
    }
}
  
