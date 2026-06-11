import requests
import pandas as pd
import os

from datetime import datetime, timedelta


INDIAN_CITIES = [

    ("Bengaluru", 12.9716, 77.5946),

    ("Mumbai", 19.0760, 72.8777),

    ("Delhi", 28.7041, 77.1025),

    ("Chennai", 13.0827, 80.2707),

    ("Kolkata", 22.5726, 88.3639),

    ("Hyderabad", 17.3850, 78.4867),

    ("Jaipur", 26.9124, 75.7873),

    ("Ahmedabad", 23.0225, 72.5714),

    ("Pune", 18.5204, 73.8567),

    ("Lucknow", 26.8467, 80.9462)
]


# ============================================
# DOWNLOAD HISTORICAL DATA
# ============================================

def download_historical_dataset(
    lat,
    lon,
    years=5
):

    try:

        end_date = datetime.now() - timedelta(days=1)

        start_date = end_date - timedelta(days=365 * years)

        url = "https://archive-api.open-meteo.com/v1/archive"

        params = {

            "latitude": lat,

            "longitude": lon,

            "start_date":
                start_date.strftime("%Y-%m-%d"),

            "end_date":
                end_date.strftime("%Y-%m-%d"),

            "hourly": [

                "temperature_2m",

                "relative_humidity_2m",

                "surface_pressure",

                "precipitation",

                "rain",

                "windspeed_10m",

                "winddirection_10m",

                "cloudcover"
            ],

            "timezone": "auto"
        }

        print(
            f"Fetching data for "
            f"{lat}, {lon}"
        )

        response = requests.get(
            url,
            params=params,
            timeout=120
        )

        data = response.json()

        if "hourly" not in data:

            print("Error fetching dataset")

            print(data)

            return None

        df = pd.DataFrame(
            data["hourly"]
        )

        return df

    except Exception as e:

        print(
            f"Dataset download error: {e}"
        )

        return None


# ============================================
# MULTI CITY DATASET GENERATION
# ============================================

def train_and_save():

    all_dataframes = []

    for city_name, lat, lon in INDIAN_CITIES:

        print(
            f"Fetching data for "
            f"{city_name}..."
        )

        city_df = download_historical_dataset(
            lat,
            lon,
            years=5
        )

        if city_df is not None:

            city_df["city"] = city_name

            all_dataframes.append(
                city_df
            )

            print(
                f"{city_name}: "
                f"{len(city_df)} rows"
            )

    if len(all_dataframes) == 0:

        print(
            "No datasets fetched"
        )

        return None

    df = pd.concat(
        all_dataframes,
        ignore_index=True
    )

    print(
        f"Final dataset rows: "
        f"{len(df)}"
    )

    os.makedirs(
        "data",
        exist_ok=True
    )

    csv_path = (
        "data/all_india_weather.csv"
    )

    df.to_csv(
        csv_path,
        index=False
    )

    print(
        f"Combined dataset saved "
        f"to: {csv_path}"
    )

    return df