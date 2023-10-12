import { Controller } from '@nestjs/common';
import { TelegramService } from './services/telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }

  // @Post('subscribe')
  // async subscribe(@Body() data: { userId: string, city: string }) {
  //   this.telegramService.subscribeToWeatherUpdates(data.userId, data.city);

  // }
}
