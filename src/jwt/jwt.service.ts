import { Inject, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    constructor(){}

    sign(userId: number): string {
        return jwt.sign({id: userId})
    }

    verify(token: string){
        const payload = jwt.decode(token);
        
        return jwt.parse(token);
    }
}