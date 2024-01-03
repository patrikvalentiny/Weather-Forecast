import {Component, inject, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit {
  private readonly weatherService: WeatherService = inject(WeatherService);

  userLocation: string = "";
  currentDate: Date = new Date();
  currentTemperature: number = 0;
  windSpeedKmh: number = 0;
  precipitation: number = 0;

  constructor() {
  }

  async ngOnInit() {
    this.userLocation = "Trnie"
    const currentWeather = await this.weatherService.getLocalForecast();
    const currentDetails =  currentWeather?.properties.timeseries.at(0)?.data.instant.details
    const nextHour = currentWeather?.properties.timeseries.at(0)?.data.next_1_hours?.details
    this.currentTemperature = currentDetails?.air_temperature ?? 0
    this.windSpeedKmh = currentDetails?.wind_speed ?? 0
    this.precipitation = nextHour?.precipitation_amount ?? 0
  }


}