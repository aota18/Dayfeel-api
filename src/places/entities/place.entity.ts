import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Place extends CoreEntity{

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @ManyToOne(
        type => User,
        place => place.places,
        {onDelete: 'SET NULL', nullable: true, eager: true}
    )
    user: User;

    @RelationId((place: Place) => place.user)
    userId: number;

}