import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetWeatherOutput } from './dtos/getweather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService
    ){}

    @Get('/')
  async getWeatherInfo(@Query() q): Promise<GetWeatherOutput> {
    return await this.weatherService.getWeatherInfo(q);
  }
}
