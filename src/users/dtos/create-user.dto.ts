import { CoreOutput } from "src/common/dtos/output.dto";

export class CreateUserInput {
    email: string;
    name: string;
    imageUrl: string;
}

export class CreateUserOutput extends CoreOutput{
    
}