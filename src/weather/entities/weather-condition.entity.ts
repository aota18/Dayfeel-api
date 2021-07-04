import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { WeatherMain } from "./weather-main.entity";

@Entity()
export class WeatherCondition {
    @PrimaryColumn()
    id: number;
    

   
    @ManyToOne(
        type => WeatherMain,
        weatherMain => weatherMain.id
    )
    @JoinColumn({ name: 'main'})
    main: WeatherMain;

    @Column()
    description: string;

    @Column()
    icon: string;

    @Column()
    img_url: string;
}