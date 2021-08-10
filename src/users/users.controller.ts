import { Body, Controller, Param, Post, Req } from '@nestjs/common';
import { CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ){}

    
    @Post('/')
    async createUser(@Body() createUserInput): Promise<CreateUserOutput> {
        return this.userService.createUser(createUserInput)
    }

    @Post('/login')
    async login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
        return this.userService.login(loginInput)
    }


    @Post('/test')
    async text(@Body() input): Promise<any> {
        return {
            ok: true
        }
    }

}
