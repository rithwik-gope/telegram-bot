import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramService } from './telegram/services/telegram.service';
import { WeatherModule } from './weather/weather.module';
import { WeatherService } from './weather/services/weather.service';
import { CatsService } from './cats/cats.service';


@Module({
  imports: [TelegramModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService, TelegramService, WeatherService, CatsService],
})
export class AppModule { }
