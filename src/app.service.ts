import { Injectable } from '@nestjs/common';
import axios from 'axios';

const apiKey = "27fd17dac109ccf1f325207ac565cffd";

@Injectable()
export class AppService {

  async getWeatherInfo({lat, lgt}): Promise<any> {



    try {
      const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lgt}&appid=${apiKey}`);
    
      return res.data;
    }catch(e){
      console.log(e);
      return "Error"
    }

    
  }
}
