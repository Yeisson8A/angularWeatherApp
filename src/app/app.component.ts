import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';
import { WeatherResponse } from './interfaces/weather-response.interface';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CitiesService } from './services/cities.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, AutoCompleteModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cityName = '';
  countryCode = '';
  citySelected!: any;
  weather: WeatherResponse | undefined;
  cities: string[] = [];

  constructor(private weatherService: WeatherService, private citiesService: CitiesService) {}

  ngOnInit() {
    const initialCity = 'Medellin';
    const initialCountry = 'CO';
    this.getWeather(initialCity, initialCountry);
  }

  getWeather(cityName: string, countryCode: string) {
    this.weatherService.getWeather(cityName, countryCode).subscribe({
      next: (res) => {
        this.weather = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitLocation() {
    this.getWeather(this.cityName, this.countryCode);
    this.cityName = '';
    this.countryCode = '';
    return false;
  }

  validSubmitLocation() {
    if (!this.cityName) {
      return false;
    }
    return true;
  }

  getImageWeather(icon: string) {
    return this.weatherService.getImageWeather(icon);
  }

  search(event: AutoCompleteCompleteEvent) {
    this.citiesService.getCities(event.query).subscribe({
      next: (res) => {
        this.cities = [...new Set(res.map(item => item.name + '-' + item.country_code))];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSelect(event: any) {
    this.cityName = String(event.value).split('-')[0];
    this.countryCode = String(event.value).split('-')[1];
  }

  clearInput() {
    this.citySelected = null;
    this.cityName = '';
    this.countryCode = '';
  }
}
