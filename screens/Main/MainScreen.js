import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, View, KeyboardAvoidingView, ImageBackground, Text } from 'react-native';
import api from '../../config/api'
import { round, getWeatherImage, getWeatherIcon } from '../../lib/utils'
import SearchInput from '../../components/SearchInput'

import styles from './styles';

const MainScreen = () => {
  const INITIAL_STATE = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: 'Clear',
  };

  const [weather, setWeather] = useState(INITIAL_STATE);

  useEffect(() => {
    fetchWeather('São Paulo');
  }, []);

  const handleChangeLocation = newLocation => {
    fetchWeather(newLocation);
  }

  const fetchWeather = async newLocation => {
    try {
      setWeather({ ...weather, loading: true });
      const search = await api.get(`/api/location/search/?query=${newLocation}`);
      const { woeid } = search.data[0];
      const location = await api.get(`/api/location/${woeid}`);
      const { consolidated_weather, title } = location.data;

      setWeather({
        ...weather,
        location: title,
        temperature: consolidated_weather[0].the_temp,
        weather: consolidated_weather[0].weather_state_name,
        loading: false,
        error: false,
      });

    } catch (error) {
      setWeather({ ...weather, error: true, loading: false });
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getWeatherImage(weather.weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={weather.loading} color="white" size="large" />

          {!weather.loading && (
            <>
              {weather.error ? (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              ) :
                (
                  <>
                    <Text style={[styles.smallText, styles.textStyle]}>{getWeatherIcon(weather.weather)}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{weather.location}</Text>
                    <Text style={[styles.smallText, styles.textStyle]}>{weather.weather}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{round(weather.temperature, 1)}°</Text>
                  </>
                )}

              <SearchInput onSubmit={handleChangeLocation} />
            </>
          )}
        </View>
      </ImageBackground>

    </KeyboardAvoidingView>
  );
}

export default MainScreen;
