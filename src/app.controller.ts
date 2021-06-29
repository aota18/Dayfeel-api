import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/weather')
  async getWeatherInfo(@Query() q): Promise<any> {
    return await this.appService.getWeatherInfo(q);
  }
}
