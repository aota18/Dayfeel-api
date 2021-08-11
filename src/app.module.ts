import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ImageModule } from './image/image.module';
import { WeatherCondition } from './weather/entities/weather-condition.entity';
import { WeatherModule } from './weather/weather.module';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV==='development' ? '.dev.env' : '/usr/share/.prod.env'
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
       
          User
        ],
        synchronize: true,
      
    }),
    // ImageModule,
    WeatherModule,
    UsersModule,
    PlacesModule,
    JwtModule.forRoot({})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){

    console.log(process.env.NODE_ENV)
  }
}
