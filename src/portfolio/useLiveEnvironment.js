import { useEffect, useState } from 'react'

const LIVE_WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'
const DEFAULT_TIME_ZONE =
  typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    : 'UTC'

const coordinateFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
})

const weatherCodeLabels = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with light hail',
  99: 'Thunderstorm with heavy hail',
}

function formatTimeZoneLabel(timeZone) {
  if (!timeZone) {
    return 'Local time zone'
  }

  return timeZone.replaceAll('_', ' ')
}

function buildTimeSnapshot(timeZone) {
  const now = new Date()

  return {
    clockLabel: new Intl.DateTimeFormat(undefined, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(now),
    dateLabel: new Intl.DateTimeFormat(undefined, {
      timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(now),
  }
}

function buildCoordinatesLabel(latitude, longitude) {
  return `${coordinateFormatter.format(latitude)}\u00B0, ${coordinateFormatter.format(
    longitude,
  )}\u00B0`
}

function buildUpdatedAtLabel(timeValue, timeZone) {
  if (!timeValue) {
    return ''
  }

  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timeValue))
}

function buildInitialState() {
  return {
    status: 'idle',
    error: '',
    locationLabel: 'Current browser time zone',
    coordinatesLabel: '',
    weatherLabel: 'Allow location to load live weather',
    temperature: null,
    apparentTemperature: null,
    humidity: null,
    windSpeed: null,
    updatedAt: '',
    timeZone: DEFAULT_TIME_ZONE,
    timeZoneLabel: formatTimeZoneLabel(DEFAULT_TIME_ZONE),
    timeZoneAbbreviation: '',
    timeSnapshot: buildTimeSnapshot(DEFAULT_TIME_ZONE),
    isDay: true,
  }
}

function getWeatherLabel(weatherCode) {
  return weatherCodeLabels[weatherCode] ?? 'Current conditions'
}

function getGeolocationErrorMessage(error) {
  if (!error) {
    return 'Location access is needed for live weather data.'
  }

  if (error.code === 1) {
    return 'Allow location access to show local weather for your current position.'
  }

  if (error.code === 2) {
    return 'Your location could not be detected right now. Please retry in a moment.'
  }

  if (error.code === 3) {
    return 'The location request timed out. Retry to fetch your live weather.'
  }

  return 'Unable to load your current location right now.'
}

async function fetchLiveWeather(latitude, longitude, signal) {
  const searchParams = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'weather_code',
      'wind_speed_10m',
      'is_day',
    ].join(','),
    timezone: 'auto',
  })

  const response = await fetch(`${LIVE_WEATHER_URL}?${searchParams.toString()}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error('Unable to fetch live weather.')
  }

  return response.json()
}

export function useLiveEnvironment() {
  const [liveEnvironment, setLiveEnvironment] = useState(() => buildInitialState())
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLiveEnvironment((current) => ({
        ...current,
        timeSnapshot: buildTimeSnapshot(current.timeZone || DEFAULT_TIME_ZONE),
      }))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const browserTimeZone =
      Intl.DateTimeFormat().resolvedOptions().timeZone || DEFAULT_TIME_ZONE

    if (!navigator.geolocation) {
      setLiveEnvironment((current) => ({
        ...current,
        status: 'error',
        error: 'Geolocation is not supported in this browser.',
        locationLabel: 'Current browser time zone',
        timeZone: browserTimeZone,
        timeZoneLabel: formatTimeZoneLabel(browserTimeZone),
        timeSnapshot: buildTimeSnapshot(browserTimeZone),
      }))

      return undefined
    }

    let isActive = true
    const controller = new AbortController()

    setLiveEnvironment((current) => ({
      ...current,
      status: 'loading',
      error: '',
      locationLabel: 'Detecting your current location...',
      timeZone: browserTimeZone,
      timeZoneLabel: formatTimeZoneLabel(browserTimeZone),
      timeSnapshot: buildTimeSnapshot(browserTimeZone),
    }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const data = await fetchLiveWeather(latitude, longitude, controller.signal)

          if (!isActive) {
            return
          }

          const resolvedTimeZone = data.timezone || browserTimeZone
          const currentWeather = data.current ?? {}

          setLiveEnvironment((current) => ({
            ...current,
            status: 'success',
            error: '',
            locationLabel: 'Current device location',
            coordinatesLabel: buildCoordinatesLabel(latitude, longitude),
            weatherLabel: getWeatherLabel(currentWeather.weather_code),
            temperature: currentWeather.temperature_2m ?? null,
            apparentTemperature: currentWeather.apparent_temperature ?? null,
            humidity: currentWeather.relative_humidity_2m ?? null,
            windSpeed: currentWeather.wind_speed_10m ?? null,
            updatedAt: buildUpdatedAtLabel(currentWeather.time, resolvedTimeZone),
            timeZone: resolvedTimeZone,
            timeZoneLabel: formatTimeZoneLabel(resolvedTimeZone),
            timeZoneAbbreviation: data.timezone_abbreviation ?? '',
            timeSnapshot: buildTimeSnapshot(resolvedTimeZone),
            isDay: currentWeather.is_day !== 0,
          }))
        } catch (error) {
          if (!isActive || error.name === 'AbortError') {
            return
          }

          setLiveEnvironment((current) => ({
            ...current,
            status: 'error',
            error: 'Live weather is unavailable right now. Please retry in a moment.',
            locationLabel: 'Current browser time zone',
            coordinatesLabel: '',
            weatherLabel: 'Weather unavailable',
            temperature: null,
            apparentTemperature: null,
            humidity: null,
            windSpeed: null,
            updatedAt: '',
            timeZone: browserTimeZone,
            timeZoneLabel: formatTimeZoneLabel(browserTimeZone),
            timeZoneAbbreviation: '',
            timeSnapshot: buildTimeSnapshot(browserTimeZone),
          }))
        }
      },
      (error) => {
        if (!isActive) {
          return
        }

        setLiveEnvironment((current) => ({
          ...current,
          status: 'error',
          error: getGeolocationErrorMessage(error),
          locationLabel: 'Current browser time zone',
          coordinatesLabel: '',
          weatherLabel: 'Weather unavailable',
          temperature: null,
          apparentTemperature: null,
          humidity: null,
          windSpeed: null,
          updatedAt: '',
          timeZone: browserTimeZone,
          timeZoneLabel: formatTimeZoneLabel(browserTimeZone),
          timeZoneAbbreviation: '',
          timeSnapshot: buildTimeSnapshot(browserTimeZone),
        }))
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    )

    return () => {
      isActive = false
      controller.abort()
    }
  }, [refreshCount])

  const refreshLiveEnvironment = () => {
    setRefreshCount((current) => current + 1)
  }

  return {
    liveEnvironment,
    refreshLiveEnvironment,
  }
}
