import { WeatherModel, WeatherData } from "../models/WeatherModel";

export interface WeatherView {
  showWeather(data: WeatherData): void;
  showError(error: string): void;
  showCitySuggestions(suggestions: string[]): void;
}

export class WeatherPresenter {
  private model: WeatherModel;
  private view: WeatherView;

  constructor(view: WeatherView) {
    this.model = new WeatherModel();
    this.view = view;
  }

  async fetchWeather(city: string) {
    try {
      const data = await this.model.getWeather(city);
      this.view.showWeather(data);
    } catch (error) {
      if (error instanceof Error) {
        this.view.showError(error.message);
      } else {
        this.view.showError("An unknown error occurred");
      }
    }
  }

  async searchCities(query: string) {
    const suggestions = await this.model.searchCities(query);
    const cityNames = suggestions.map(suggestion => suggestion.name);
    this.view.showCitySuggestions(cityNames);
  }
}
