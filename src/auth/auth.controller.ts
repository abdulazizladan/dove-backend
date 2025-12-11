import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'User login', description: 'Authenticate user with username and password' })
    @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } })
    @ApiResponse({ status: 200, description: 'User successfully logged in and JWT token returned.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user', description: 'Create a new user account' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
}
