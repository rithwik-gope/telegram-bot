import { Module } from '@nestjs/common';
import { TelegramService } from './services/telegram.service';
// import { WeatherService } from 'src/weather/services/weather.service';
import { TelegramController } from './telegram.controller';
import { WeatherService } from 'src/weather/services/weather.service';

@Module({
    providers: [TelegramService, WeatherService],
    exports: [TelegramService],
    controllers: [TelegramController],
})
export class TelegramModule { }


