import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>
    ){}

    async createUser(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
        try{
           
            const {name, email, imageUrl} = createUserInput;

 
            //Check if same email exists
            const user = await this.users.find({
                email
            });

            if(user){
                return {
                    ok: false,
                    error: 'user already exists'
                }
            }

            const result = await this.users.save(
                this.users.create({
                    name,
                    email,
                    imageUrl
                })
            )

            return {
                ok: true
            }

        }catch(e){
           
            return {
                ok: false,
                error: e
            }
        }
        
    }


    async login(loginInput: LoginInput): Promise<LoginOutput> {
        try {

            const {name, email, imageUrl, token} = loginInput;

             // Check if there is token
             if(!token){
                return {
                    ok: false,
                    error: 'There is no token'
                }
            }
           
            const user = await this.users.findOne({
                email
            });

             // If user doesn't exist, create new one
            if(!user){
                const newUser = await this.users.save(this.users.create({
                    name,
                    email,
                    imageUrl
                }));


                return {
                    ok: true,
                    user:newUser
                }
            }else {
                return {
                    ok: true,
                    user
                }
            }
        


        }catch(e){
            return {
                ok: false,
                error: e
            }
        }
    }

    // async loginWithApple(): Promise<any> {
         
    // }

}
