import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class WeatherService {
  private readonly openWeatherMapApiKey = '8a5e497657082bc68f365d5f71ae513a';
  async getWeather(city: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeatherMapApiKey}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`)
    }
  }

}
