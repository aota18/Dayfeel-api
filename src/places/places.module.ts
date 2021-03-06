import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { WeatherCondition } from 'src/weather/entities/weather-condition.entity';
import { Place } from './entities/place.entity';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  imports: [TypeOrmModule.forFeature([Place, User, WeatherCondition])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
