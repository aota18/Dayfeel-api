import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaceInput, CreatePlaceOutput } from './dtos/create-place.dto';
import { GetPlacesInput, GetPlacesOutput } from './dtos/get-places.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private readonly places: Repository<Place>,
        @InjectRepository(User)
        private readonly users: Repository<User>
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

            let places: Place[]
            
            const user = await this.users.findOne({
                email
            });

             places = await this.places.find({
                where: {
                    user,
                }
            })

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
}
