import { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = useCallback(async (city) => {
    if (!API_KEY) {
      setError('API key not configured. Please add VITE_WEATHER_API_KEY to your .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/current.json`, {
          params: { key: API_KEY, q: city }
        }),
        axios.get(`${BASE_URL}/forecast.json`, {
          params: { key: API_KEY, q: city, days: 5 }
        })
      ]);

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    } catch (err) {
      if (err.response?.data?.error?.code === 1006) {
        setError('City not found. Please check the spelling and try again.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Unable to fetch weather data. Please check your connection.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your WeatherAPI key.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    if (!API_KEY) {
      setError('API key not configured. Please add VITE_WEATHER_API_KEY to your .env file.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/current.json`, {
          params: { key: API_KEY, q: `${lat},${lon}` }
        }),
        axios.get(`${BASE_URL}/forecast.json`, {
          params: { key: API_KEY, q: `${lat},${lon}`, days: 5 }
        })
      ]);

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError('Unable to fetch weather data. Please check your connection.');
      } else if (err.response?.status === 401) {
        setError('Invalid API key. Please check your WeatherAPI key.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords
  };
}
