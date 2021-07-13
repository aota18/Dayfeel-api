import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";

export class LoginInput {
    name: string;
    email: string;
    imageUrl: string;
    token: string;
}

export class LoginOutput extends CoreOutput{
    user?: User
}