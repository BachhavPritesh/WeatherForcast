export function getCountryFlag(countryCode) {
  if (!countryCode) return '';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function convertTemperature(temp, unit) {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32);
  }
  return Math.round(temp);
}

export function getDayName(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function getWeatherIconUrl(iconPath) {
  if (iconPath.startsWith('//')) {
    return `https:${iconPath}`;
  }
  return iconPath;
}
