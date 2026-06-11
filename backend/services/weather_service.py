import requests
import os
from datetime import datetime



# API CONFIGURATION

OPENWEATHER_API_KEY = "YOUR_API_KEY"

OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/"


# FETCH CURRENT WEATHER

def get_current_weather(city):

    url = f"{OPENWEATHER_BASE_URL}weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"
    print("FORECAST URL =", url)
    response = requests.get(url, timeout=10)

    data = response.json()


    if response.status_code != 200:
        raise Exception(f"City not found: {city}")


    

    return {

        'city': data['name'],

        'current_temp': round(data['main']['temp'], 1),

        'feels_like': round(data['main']['feels_like'], 1),

        'temp_min': round(data['main']['temp_min'], 1),

        'temp_max': round(data['main']['temp_max'], 1),

        'humidity': data['main']['humidity'],

        'description': data['weather'][0]['description'],

        'icon': data['weather'][0]['icon'],

        'main_weather': data['weather'][0]['main'],

        'country': data['sys']['country'],

        'wind_deg': data['wind'].get('deg', 0),

        'wind_speed': round(data['wind']['speed'], 1),

        'pressure': data['main']['pressure'],

        'clouds': data['clouds']['all'],

        'visibility': data.get('visibility', 10000),

        'lat': data['coord']['lat'],

        'lon': data['coord']['lon'],

        

        
    }
def get_7_day_forecast(lat, lon):

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}"
        f"&longitude={lon}"
        "&daily="
        "temperature_2m_max,"
        "temperature_2m_min,"
        "precipitation_probability_max,"
        "wind_speed_10m_max,"
        "weather_code"
        "&timezone=auto"
    )

    print("FORECAST URL:", url)

    response = requests.get(
        url,
        timeout=10
    )

    data = response.json()

    print("FORECAST RESPONSE:", data)

    daily = data["daily"]

    forecast_data = []

    for i in range(len(daily["time"])):

        forecast_data.append({

            "date":
                daily["time"][i],

            "day":
                datetime.strptime(
                    daily["time"][i],
                    "%Y-%m-%d"
                ).strftime("%A"),

            "temp_max":
                daily["temperature_2m_max"][i],

            "temp_min":
                daily["temperature_2m_min"][i],

            "rain_probability":
                daily["precipitation_probability_max"][i],

            "wind_speed":
                daily["wind_speed_10m_max"][i],

            "humidity":
                70,

            "weather_code":
                daily["weather_code"][i]

        })

    return forecast_data