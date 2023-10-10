import { Controller, Get } from '@nestjs/common';
import { TelegramService } from './services/telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) { }

  @Get('send-message')
  async sendMessage() {
    const chatId = 'chatId';
    const message = 'Hello, this is your Telegram bot!';

    await this.telegramService.sendMessage(chatId, message);
    return 'Message sent successfully!';
  }
}
