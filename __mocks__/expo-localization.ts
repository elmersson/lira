export const locale = 'en-US';
export const locales = ['en-US'];
export const timezone = 'UTC';
export const isRTL = false;

// Add the new getLocales function for tests
export const getLocales = () => [
  {
    languageTag: 'en-US',
    languageCode: 'en',
    textDirection: 'ltr',
    digitGroupingSeparator: ',',
    decimalSeparator: '.',
    measurementSystem: 'us',
    currencyCode: 'USD',
    currencySymbol: '$',
    regionCode: 'US',
    temperatureUnit: 'fahrenheit',
  },
];

export const getCalendars = () => [
  {
    calendar: 'gregory',
    timeZone: 'UTC',
    uses24hourClock: false,
    firstWeekday: 1,
  },
];
