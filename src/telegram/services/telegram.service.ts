import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
const YOUR_TELEGRAM_BOT_TOKEN =
    '6463930308:AAFORUXW7Ugcjpa1MOPz3pOgGq4upjoKUqE';

@Injectable()
export class TelegramService {
    private bot: TelegramBot;
    constructor() {
        if (this.bot) {
            this.bot = new TelegramBot('6463930308:AAFORUXW7Ugcjpa1MOPz3pOgGq4upjoKUqE', { polling: true });
            this.bot.on('message', this.onReceiveMessage);
        }
    }

    onReceiveMessage = (msg: any) => {
        const chatId = msg.chat.id;
        console.log(`Received message in chat ID: ${chatId}`);
    };
    async sendMessage(chatId: string, message: string) {
        await this.bot.sendMessage(chatId, message);
    }
}
