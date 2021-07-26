import { CoreOutput } from "src/common/dtos/output.dto";

export class CreatePlaceInput {
    userId: number;
    country: string;
    city: string;
    latitude: string;
    longitude: string;
}

export class CreatePlaceOutput extends CoreOutput{

}