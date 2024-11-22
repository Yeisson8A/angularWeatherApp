import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WeatherResponse } from '../interfaces/weather-response.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = environment.apiKeyWeather;
  private httpClient = inject(HttpClient);

  constructor() {}

  getWeather(cityName: string, countryCode: string) {
    let params = new HttpParams();
    params = params.append('appid', this.apiKey);
    params = params.append('units', 'metric');
    params = params.append('lang', 'es');
    params = params.append('q', `${cityName},${countryCode}`);

    return this.httpClient.get<WeatherResponse>(this.baseUrl, {params});
  }

  getImageWeather(icon: string) {
    let url = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    return url;
  }
}
