import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherCondition } from './entities/weather-condition.entity';
import { WeatherMain } from './entities/weather-main.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherCondition, WeatherMain])],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
