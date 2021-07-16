import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class WeatherCondition {
    @PrimaryColumn()
    id: number;
    

    @Column({nullable: true})
    img_url: string;
}