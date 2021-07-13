import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WeatherCondition } from "./weather-condition.entity";

@Entity()
export class WeatherMain {
    @PrimaryGeneratedColumn()
    @OneToMany(
        type => WeatherCondition,
        weatherCondition => weatherCondition.main
    )
    id: number;

    
    @Column({
        nullable: true
    })
    name?: string;
}