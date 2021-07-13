import { CoreOutput } from "src/common/dtos/output.dto";
import { Place } from "../entities/place.entity";

export class GetPlacesInput {
    email: string
}

export class GetPlacesOutput extends CoreOutput{
    places?: Place[]
}