import { ReactNode } from "react";

export interface WeatherData {
  visibility: ReactNode;
  dewPoint: ReactNode;
  windDirection: ReactNode;
  feelsLike: ReactNode;
  temperature: number;
  city: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export class WeatherModel {
  private apiKey = "84503ed75e8da7c5712bb4d1e344dc78"; // Reemplaza con tu clave de API

  async getWeather(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        return {
          temperature: data.main.temp,
          city: data.name,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          visibility: data.visibility,
          dewPoint: data.main.dew_point,
          windDirection: data.wind.deg,
          feelsLike: data.main.feels_like,
        };
      } else {
        throw new Error(data.message || "Error al obtener el clima");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  async searchCities(query: string): Promise<{ name: string; fullName: string; id: string }[]> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`
    );
    const data = await response.json();

    return data.map((city: any) => ({
      name: city.name,
      fullName: `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`,
      id: `${city.name}-${city.lat}-${city.lon}`, // ID único basado en coordenadas
    }));
  } catch (error) {
    return [];
  }
}



}
