import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaceInput, CreatePlaceOutput } from './dtos/create-place.dto';
import { GetPlacesInput, GetPlacesOutput } from './dtos/get-places.dto';
import { Place } from './entities/place.entity';
import axios from 'axios';
import { SearchPlaceInput, SearchPlaceOutput } from './dtos/search-place.dto';
import { WeatherCondition } from 'src/weather/entities/weather-condition.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
    constructor(
        private readonly config: ConfigService,
        @InjectRepository(Place)
        private readonly places: Repository<Place>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(WeatherCondition)
        private readonly weatherConditions: Repository<WeatherCondition>
    ){}

    async createPlace(createPlaceInput: CreatePlaceInput): Promise<CreatePlaceOutput> {
        try {

            const {country, city, longitude, latitude} = createPlaceInput;


            // Temporary User
            const user = await this.users.findOne(8)

            const result = await this.places.save(this.places.create({
                user,
                country,
                city,
                longitude,
                latitude
            }))
            
            return {
                ok: true
            }

        } catch(e){
            return {
                ok: false,
                error: e
            }
        }
    }


    async getPlaces(getPlacesInput: GetPlacesInput):Promise<GetPlacesOutput> {
        try {
            const {email} = getPlacesInput;


            let places: any[]

            const user = await this.users.findOne({
                email
            });

            places = await this.places.find({
                where: {
                    user,
                }
            });

            for (const place of places){
                let apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
                const res = await 
                axios.get(`${apiUrl}?lat=${place.latitude}&lon=${place.longitude}&appid=${this.config.get('WEATHER_API_KEY')}`);

                const queryResult = await this.weatherConditions.createQueryBuilder('weather_condition')
                .select('weather_condition.id', 'id')
                .addSelect('weather_condition.img_url', 'imgUrl')
                .where({
                    id: res.data.weather[0].id
                    })
                .getRawOne()

                place.imgUrl = queryResult.imgUrl
                place.main = res.data.weather[0].main
                place.description = res.data.weather[0].description
                place.temp = res.data.main.temp
                place.humidity = res.data.main.humidity
            
                }

            return {
                ok: true,
                places
            }

        }catch(e){
            return {
                ok: false,
                error: e
            }
        }
    }


    async searchPlace(searchPlaceInput: SearchPlaceInput): Promise<SearchPlaceOutput> {
        try {
            const {keyword} = searchPlaceInput;

            const apiUrl = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=${keyword}`;
  
            const res = await axios.get(apiUrl)
            return {
                ok: true,
                cities: res.data.data
            }

        }catch(e){
            return {
                ok: false,
                error: 'Cannot search place'
            }
        }
    }
}
