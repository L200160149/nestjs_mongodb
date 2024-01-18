import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
// import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto):Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }




    // private readonly users: User[] = [
    //     {
    //         username: "test",
    //         password: "testpwd",
    //     }
    // ];

    // create(user: User) {
    //     this.users.push(user);
    //     return this.users;
    // }

    // findAll(): User[] {
    //     return this.users;
    // }
}