import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherCondition } from './entities/weather-condition.entity';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherCondition])],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
