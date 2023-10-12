import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
// import { Test_User_ID } from '../telegram.constants';
import { WeatherService } from 'src/weather/services/weather.service';
import * as cron from 'node-cron';
const TELEGRAM_TOKEN = '6330096507:AAFtOELzbviQlnV6shpi2uxemQpctqauarE';
@Injectable()
export class TelegramService {
    private bot: TelegramBot;

    private logger = new Logger(TelegramService.name)
    private subscriptions: { [userId: string]: string } = {};

    constructor(private readonly weatherService: WeatherService) {
        if (this.bot) {
            this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });
            this.bot.on('message', this.onReceiveMessage);
            this.logger.debug('Telegram bot started');
            // this.sendMessageToUser(Test_User_ID, `server started at ${new Date()}`);
        }

        cron.schedule('0 12 * * *', () => {
            this.sendDailyWeatherUpdatesToAllSubscribers();
        });

    }


    onReceiveMessage = (msg: any) => {
        this.logger.debug(msg);
    };


    sendMessageToUser = (userId: string, message: string) => {
        this.bot.sendMessage(userId, message);
    }


    subscribeToWeatherUpdates(userId: string, city: string) {
        this.subscriptions[userId] = city;
        this.sendMessageToUser(userId, `Subscribed to daily weather updates for ${city}.`);
        this.sendDailyWeatherUpdates(userId, city);
    }

    async sendDailyWeatherUpdates(userId: string, city: string) {
        try {
            const weatherData = await this.weatherService.getWeather(city);
            const message = `Weather update for ${city}:\nTemperature: ${weatherData.main.temp}°C\nWeather: ${weatherData.weather[0].description}`;
            this.sendMessageToUser(userId, JSON.stringify(weatherData));
        } catch (error) {
            this.logger.error(`Failed to send weather update: ${error.message}`);
        }
    }
    sendDailyWeatherUpdatesToAllSubscribers() {
        for (const userId in this.subscriptions) {
            const city = this.subscriptions[userId];
            this.sendDailyWeatherUpdates(userId, city);
        }

    }
}