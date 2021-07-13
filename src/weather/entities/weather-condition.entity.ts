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

    @Column({nullable: true})
    description: string;

    @Column({ nullable: true})
    icon: string;

    @Column({nullable: true})
    img_url: string;
}