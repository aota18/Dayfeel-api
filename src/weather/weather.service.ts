import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { GetWeatherOutput } from './dtos/getweather.dto';
import { WeatherCondition } from './entities/weather-condition.entity';

@Injectable()
export class WeatherService {
    constructor(
        private readonly config: ConfigService,
        @InjectRepository(WeatherCondition)
        private  weatherConditionRepository: Repository<WeatherCondition>
      ){}
    
      async getWeatherInfo({lat, lgt}): Promise<GetWeatherOutput> {
    
        let apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    
        /* San Francisco Lat, Long */
        let sampleLatLng = {lat: 37.774929, lgt: -122.419418};
    
    
        try {
          const res = await axios.get(`${apiUrl}?lat=${lat}&lon=${lgt}&appid=${this.config.get('WEATHER_API_KEY')}`);

          const queryResult = await this. weatherConditionRepository.createQueryBuilder('weather_condition')
          .select('weather_condition.id', 'id')
          .addSelect('weather_condition.img_url', 'imgUrl')
          .where({
            id: res.data.weather[0].id
            })
          .getRawOne();

          console.log(queryResult);

          let result = {
              ...queryResult,
              main: res.data.weather[0].main,
              description:res.data.weather[0].description,
              icon:res.data.weather[0].icon,
              temp: res.data.main.temp,
              humidity: res.data.main.humidity,
              country: res.data.sys.country,
              city: res.data.name
          }

                  
          return {
              ok: true,
              result
          }
        }catch(e){
          console.log(e);
          return {
              ok: false,
              error: "Cannot get Weather Info"
          }
        }
    
        
      }
}
