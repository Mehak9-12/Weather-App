import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

function WeatherApp() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [hourly, setHourly] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather(query) {
    if (!query) return;

    try {
      setError("");
      setIsLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=1&aqi=no&alerts=no`
      );

      if (!res.ok) {
        throw new Error(`City not found (${res.status})`);
      }

      const data = await res.json();
      setWeather(data);
      setHourly(data.forecast.forecastday[0].hour);
    } catch (e) {
      // console.error(e);
      setWeather(null);
      setError(e.message);
      setHourly([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchWeather("Srinagar, IN");
  }, []);

  const handleCitySelect = (selectedCity) => {
    fetchWeather(selectedCity);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <WeatherCard 
        data={weather} 
        hour={hourly} 
        apiKey={apiKey}
        onSelect={handleCitySelect}
        loading={isLoading}
        error={error}
      />
    </div>
  );
}

export default WeatherApp;