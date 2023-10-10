import { Module } from '@nestjs/common';
import { TelegramService } from './services/telegram.service';
import { TelegramController } from './telegram.controller';

@Module({
    providers: [TelegramService],
    exports: [TelegramService],
    controllers: [TelegramController],
})
export class TelegramModule { }


