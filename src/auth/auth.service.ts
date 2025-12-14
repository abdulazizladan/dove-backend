import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            if (user.status === 'suspended') {
                throw new UnauthorizedException('User account suspended. Please contact admin');
            }
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        try {
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            console.error('Error signing JWT:', error);
            throw error;
        }
    }

    async register(createUserDto: any) {
        const user = await this.usersService.create(createUserDto);
        const { password, ...result } = user;
        return result;
    }
}
