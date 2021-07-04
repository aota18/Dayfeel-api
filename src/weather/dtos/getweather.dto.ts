import { CoreOutput } from "src/common/dtos/output.dto";

export class GetWeatherInput {

}

export class GetWeatherOutput extends CoreOutput {
    result?: {
        id: number;
        imgUrl: string;
        main: string;
        description: string;
        icon: string;
        temp: string;
        country: string;
        city: string;
    }
}
    