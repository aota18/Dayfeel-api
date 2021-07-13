import { CoreEntity } from "src/common/entities/core.entity";
import { Place } from "src/places/entities/place.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends CoreEntity{

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    imageUrl: string;

    @OneToMany(
        type => Place,
        place => place.user
    )
    places?: Place[]
}