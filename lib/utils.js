export const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

export const getWeatherImage = weather => {
  const images = {
    Clear: require('../assets/images/clear.jpg'),
    Hail: require('../assets/images/hail.jpg'),
    'Heavy Cloud': require('../assets/images/heavy-cloud.jpg'),
    'Light Cloud': require('../assets/images/light-cloud.jpg'),
    'Heavy Rain': require('../assets/images/heavy-rain.jpg'),
    'Light Rain': require('../assets/images/light-rain.jpg'),
    Showers: require('../assets/images/showers.jpg'),
    Sleet: require('../assets/images/sleet.jpg'),
    Snow: require('../assets/images/snow.jpg'),
    ThunderStorm: require('../assets/images/thunderstorm.jpg')
  };

  return images[weather];
}

export const getWeatherIcon = weather => {
  const icons = {
    Clear: '☀️',
    Hail: '⛆',
    'Heavy Cloud': '☁️',
    'Light Cloud': '⛅',
    'Heavy Rain': '⛈️',
    'Light Rain': '🌧️',
    Showers: '🌧️',
    Sleet: '🌨️',
    Snow: '❄️',
    Thunder: '⛈️'
  };

  return icons[weather];
}