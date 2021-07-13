import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlaceInput, CreatePlaceOutput } from './dtos/create-place.dto';
import { GetPlacesInput, GetPlacesOutput } from './dtos/get-places.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
    constructor(
        private readonly places: PlacesService
    ){}
    

    @Post('/')
    async createPlace(@Body() createPlaceInput: CreatePlaceInput):Promise<CreatePlaceOutput> {
        return this.places.createPlace(createPlaceInput);
    }

    @Get('/all')
    async getPlaces(@Body() getPlacesInput: GetPlacesInput):Promise<GetPlacesOutput> {
        return this.places.getPlaces(getPlacesInput);
    }
}
