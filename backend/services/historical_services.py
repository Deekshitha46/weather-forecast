import requests
import pandas as pd
from datetime import datetime, timedelta


def fetch_historical_data(lat, lon, days_back=365):
    """
    Fetch hourly historical weather data from Open-Meteo API.
    """

    end_date = datetime.now() - timedelta(days=1)
    start_date = end_date - timedelta(days=days_back)

    url = "https://archive-api.open-meteo.com/v1/archive"

    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start_date.strftime("%Y-%m-%d"),
        "end_date": end_date.strftime("%Y-%m-%d"),
        "hourly": [
            "temperature_2m",

    "relative_humidity_2m",

    "dew_point_2m",

    "surface_pressure",

    "precipitation",

    "rain",

    "showers",

    "snowfall",

    "windspeed_10m",

    "windgusts_10m",

    "winddirection_10m",

    "cloudcover",

    "cloudcover_low",

    "cloudcover_mid",

    "cloudcover_high",

    "soil_moisture_0_to_1cm",

    "shortwave_radiation",

    "vapour_pressure_deficit"
        ],
        "timezone": "auto"
    }

    try:
        response = requests.get(url, params=params, timeout=60)
        data = response.json()

        if "hourly" not in data:
            print(f"Historical data error: {data}")
            return None

        df = pd.DataFrame(data["hourly"])

        # Convert time column
        df["time"] = pd.to_datetime(df["time"])

        # Set index
        df = df.set_index("time")

        # Ensure continuous hourly data
        df = df.asfreq("h")

        # Fill missing values
        df = df.ffill(limit=6)

        # Drop remaining NaN rows
        df = df.dropna()

        # Reset index
        df = df.reset_index()

        return df

    except Exception as e:
        print(f"Error fetching historical data: {e}")
        return None