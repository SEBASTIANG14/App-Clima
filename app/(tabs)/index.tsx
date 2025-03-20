import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { WeatherPresenter } from "../presenters/WeatherPresenter";
import { WeatherData } from "../models/WeatherModel";

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presenter = new WeatherPresenter({
    showWeather: (data: WeatherData) => {
      setWeather(data);
      setError(null);
    },
    showError: (errorMessage: string) => {
      setError(errorMessage);
      setWeather(null);
    },
    showCitySuggestions: (suggestions: string[]) => {
      console.log("City suggestions:", suggestions);
    },
  });

  const handleSearch = () => {
    if (city.trim() !== "") {
      presenter.fetchWeather(city);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta el Clima</Text>
      <Text style={styles.infoText}>
        📌 Solo algunas ciudades pueden ser consultadas. Asegúrate de escribir correctamente el nombre. Ej. London, Mexico City, New York
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una ciudad"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.date}>{new Date().toLocaleString()}</Text>
          <Text style={styles.city}>{weather.city}</Text>
          <Text style={styles.description}>
            Feels like {weather.feelsLike}°C. {weather.description}.
          </Text>

          <View style={styles.weatherDetails}>
            <Image source={{ uri: weather.icon }} style={styles.icon} />
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
          </View>

          <View style={styles.extraInfo}>
            <Text>💨 {weather.windSpeed}m/s {weather.windDirection}</Text>
            <Text>🌡 {weather.pressure}hPa</Text>
            <Text>Humidity: {weather.humidity}%</Text>
            <Text>Dew Point: {weather.dewPoint}°C</Text>
            <Text>Visibility: {weather.visibility}km</Text>
          </View>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  weatherContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  date: {
    fontSize: 14,
    color: "#ff5733",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
  },
  weatherDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
  },
  extraInfo: {
    marginTop: 10,
  },
});

export default App;
