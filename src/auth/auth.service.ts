import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService    
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const comparePassword = await compare(pass, user.password);
        console.log('user:', user);
        
        if(!comparePassword) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user._id, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }

        const {password, ...result} = user;
        return user;
    }
}
