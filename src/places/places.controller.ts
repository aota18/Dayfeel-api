import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePlaceInput, CreatePlaceOutput } from './dtos/create-place.dto';
import { GetPlacesInput, GetPlacesOutput } from './dtos/get-places.dto';
import { SearchPlaceInput, SearchPlaceOutput } from './dtos/search-place.dto';
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
    async getPlaces(@Query() getPlacesInput: GetPlacesInput):Promise<GetPlacesOutput> {
        return this.places.getPlaces(getPlacesInput);
    }

    @Get('/search')
    async searchPlace(@Query() searchPlaceInput: SearchPlaceInput): Promise<SearchPlaceOutput> {
        return this.places.searchPlace(searchPlaceInput);
    }
}
