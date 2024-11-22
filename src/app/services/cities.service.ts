import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CityResponse } from '../interfaces/city-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private baseUrl: string = 'https://city-and-state-search-api.p.rapidapi.com/cities/search';
  private apiKey: string = environment.apiKeyCities;
  private httpClient = inject(HttpClient);

  constructor() { }

  getCities(cityName: string) {
    const headers = new HttpHeaders({
      'x-rapidapi-key': this.apiKey
    });
    let params = new HttpParams();
    params = params.append('q', cityName);
    params = params.append('limit', 10);

    return this.httpClient.get<CityResponse[]>(this.baseUrl, {headers, params});
  }
}
