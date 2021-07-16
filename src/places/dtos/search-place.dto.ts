import { CoreOutput } from "src/common/dtos/output.dto";

export class SearchPlaceInput {
    keyword: string;
}

export class SearchPlaceOutput extends CoreOutput{
    cities?: any[]
}