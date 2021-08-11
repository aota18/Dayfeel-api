import { CoreOutput } from "src/common/dtos/output.dto";

export class AuthorizeInput {
    code: string;
    token: string;
}

export class AuthorizeOutput extends CoreOutput{

}