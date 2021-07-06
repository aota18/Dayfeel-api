import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { WeatherCondition } from './weather/entities/weather-condition.entity';
import { WeatherMain } from './weather/entities/weather-main.entity';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ==='production' ? '/usr/share/env/.prod.env' : '.dev.env'
    }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        autoLoadEntities: true,
        entities: [
          WeatherCondition,
          WeatherMain
        ],
        synchronize: false,
      
    }),
    ImageModule,
    WeatherModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
