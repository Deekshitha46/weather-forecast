import requests
import pandas as pd
from datetime import datetime, timedelta
from services.ml_service import EXPECTED_FEATURES
from services.weather_service import get_current_weather

import numpy as np


def fetch_historical_weather(city):

    weather = get_current_weather(city)

    lat = weather["lat"]
    lon = weather["lon"]

    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=7)

    url = (
        "https://archive-api.open-meteo.com/v1/archive"
        f"?latitude={lat}"
        f"&longitude={lon}"
        f"&start_date={start_date}"
        f"&end_date={end_date}"
        "&hourly="
        "temperature_2m,"
        "relative_humidity_2m,"
        "surface_pressure,"
        "precipitation,"
        "rain,"
        "windspeed_10m,"
        "cloudcover"
        "&timezone=auto"
    )

    response = requests.get(url, timeout=20)

    data = response.json()

    return data

def historical_to_dataframe(data):

    hourly = data["hourly"]

    df = pd.DataFrame({

        "time":
            hourly["time"],

        "temperature_2m":
            hourly["temperature_2m"],

        "relative_humidity_2m":
            hourly["relative_humidity_2m"],

        "surface_pressure":
            hourly["surface_pressure"],

        "precipitation":
            hourly["precipitation"],

        "rain":
            hourly["rain"],

        "windspeed_10m":
            hourly["windspeed_10m"],

        "cloudcover":
            hourly["cloudcover"]

    })

    df["time"] = pd.to_datetime(
        df["time"]
    )

    return df



def add_time_features(df):

    df["hour"] = df["time"].dt.hour

    df["day_of_year"] = (
        df["time"].dt.dayofyear
    )

    df["month"] = (
        df["time"].dt.month
    )

    df["day_of_week"] = (
        df["time"].dt.dayofweek
    )

    df["hour_sin"] = np.sin(
        2 * np.pi * df["hour"] / 24
    )

    df["hour_cos"] = np.cos(
        2 * np.pi * df["hour"] / 24
    )

    df["day_sin"] = np.sin(
        2 * np.pi *
        df["day_of_year"] / 365
    )

    df["day_cos"] = np.cos(
        2 * np.pi *
        df["day_of_year"] / 365
    )
    df["dayofyear"] = df["time"].dt.dayofyear

    df["month_sin"] = np.sin(
        2 * np.pi * df["month"] / 12
    )

    df["month_cos"] = np.cos(
        2 * np.pi * df["month"] / 12
    )

    return df

def add_lag_features(df):

    lag_hours = [

        1,
        3,
        6,
        12,
        24,
        48

    ]

    feature_columns = [

        "temperature_2m",

        "relative_humidity_2m",

        "surface_pressure",

        "rain",

        "windspeed_10m",

        "cloudcover"

    ]

    for col in feature_columns:

        prefix = {

            "temperature_2m":
                "temp",

            "relative_humidity_2m":
                "humidity",

            "surface_pressure":
                "pressure",

            "rain":
                "rain",

            "windspeed_10m":
                "wind",

            "cloudcover":
                "cloud"

        }[col]

        for lag in lag_hours:

            df[
                f"{prefix}_lag_{lag}"
            ] = df[col].shift(lag)
            df[f"{prefix}_{lag}h_ago"] = df[col].shift(lag)
    return df

def add_rolling_features(df):

    avg_windows = [

        6,
        24,
        48,
        72,
        96

    ]

    for window in avg_windows:

        df[
            f"temp_{window}h_avg"
        ] = (

            df["temperature_2m"]

            .rolling(window)

            .mean()

        )

        df[
            f"humidity_{window}h_avg"
        ] = (

            df["relative_humidity_2m"]

            .rolling(window)

            .mean()

        )

        df[
            f"pressure_{window}h_avg"
        ] = (

            df["surface_pressure"]

            .rolling(window)

            .mean()

        )

        df[
            f"wind_{window}h_avg"
        ] = (

            df["windspeed_10m"]

            .rolling(window)

            .mean()

        )

    std_windows = [

        6,
        12,
        24,
        48

    ]

    for window in std_windows:

        df[
            f"temp_{window}h_std"
        ] = (

            df["temperature_2m"]

            .rolling(window)

            .std()

        )

        df[
            f"humidity_{window}h_std"
        ] = (

            df["relative_humidity_2m"]

            .rolling(window)

            .std()

        )

        df[
            f"pressure_{window}h_std"
        ] = (

            df["surface_pressure"]

            .rolling(window)

            .std()

        )

    return df

def add_change_features(df):

    change_hours = [

        1,
        3,
        6

    ]

    for lag in change_hours:

        df[
            f"temp_change_{lag}h"
        ] = (

            df["temperature_2m"]

            -

            df[
                "temperature_2m"
            ].shift(lag)

        )

        df[
            f"pressure_change_{lag}h"
        ] = (

            df["surface_pressure"]

            -

            df[
                "surface_pressure"
            ].shift(lag)

        )

        df[
            f"humidity_change_{lag}h"
        ] = (

            df[
                "relative_humidity_2m"
            ]

            -

            df[
                "relative_humidity_2m"
            ].shift(lag)

        )

        df[
            f"wind_change_{lag}h"
        ] = (

            df[
                "windspeed_10m"
            ]

            -

            df[
                "windspeed_10m"
            ].shift(lag)

        )

    return df

def add_rain_features(df):

    df["rain_6h_sum"] = (

        df["rain"]

        .rolling(6)

        .sum()

    )

    df["rain_12h_sum"] = (

        df["rain"]

        .rolling(12)

        .sum()

    )

    df["rain_24h_sum"] = (

        df["rain"]

        .rolling(24)

        .sum()

    )

    df["rain_last_hour"] = (

        df["rain"] > 0

    ).astype(int)

    df["heavy_rain_last_hour"] = (

        df["rain"] > 10

    ).astype(int)

    df["extreme_rain_last_hour"] = (

        df["rain"] > 25

    ).astype(int)

    return df

def add_pressure_features(df):

    df["pressure_falling"] = (

        df["pressure_change_3h"]

        < 0

    ).astype(int)

    df["pressure_rising"] = (

        df["pressure_change_3h"]

        > 0

    ).astype(int)

    df["pressure_drop_rate"] = (

        -df["pressure_change_6h"]

    )

    return df

def add_interaction_features(df):

    df["temp_humidity_interaction"] = (
        df["temperature_2m"]
        *
        df["relative_humidity_2m"]
    )

    df["temp_pressure_interaction"] = (
        df["temperature_2m"]
        *
        df["surface_pressure"]
    )

    df["wind_pressure_interaction"] = (
        df["windspeed_10m"]
        *
        df["surface_pressure"]
    )

    df["cloud_rain_interaction"] = (
        df["cloudcover"]
        *
        df["rain"]
    )

    df["temp_wind_interaction"] = (
        df["temperature_2m"]
        *
        df["windspeed_10m"]
    )

    return df

def add_risk_features(df):

    df["heatwave_risk"] = (
        (df["temperature_2m"] > 35)
    ).astype(int)

    df["high_humidity"] = (
        (df["relative_humidity_2m"] > 80)
    ).astype(int)

    df["storm_risk"] = (
        (
            df["windspeed_10m"] > 20
        )
        &
        (
            df["cloudcover"] > 70
        )
    ).astype(int)

    df["rain_event"] = (
        df["rain"] > 0
    ).astype(int)

    return df

def add_remaining_features(df):

    # Temperature ranges

    df["temp_24h_max"] = (
        df["temperature_2m"]
        .rolling(24)
        .max()
    )

    df["temp_24h_min"] = (
        df["temperature_2m"]
        .rolling(24)
        .min()
    )

    df["temp_48h_max"] = (
        df["temperature_2m"]
        .rolling(48)
        .max()
    )

    df["temp_48h_min"] = (
        df["temperature_2m"]
        .rolling(48)
        .min()
    )

    df["temperature_range"] = (
        df["temp_24h_max"]
        -
        df["temp_24h_min"]
    )

    # Pressure minimums

    df["pressure_24h_min"] = (
        df["surface_pressure"]
        .rolling(24)
        .min()
    )

    df["pressure_48h_min"] = (
        df["surface_pressure"]
        .rolling(48)
        .min()
    )

    # Interactions

    df["humidity_pressure_interaction"] = (
        df["relative_humidity_2m"]
        *
        df["surface_pressure"]
    )

    df["cloud_humidity_interaction"] = (
        df["cloudcover"]
        *
        df["relative_humidity_2m"]
    )

    # Persistence

    df["rain_persistence"] = (
        (
            df["rain"]
            .rolling(6)
            .sum()
        ) > 0
    ).astype(int)

    df["storm_persistence"] = (
        (
            df["windspeed_10m"]
            .rolling(6)
            .mean()
            > 15
        )
        &
        (
            df["cloudcover"]
            .rolling(6)
            .mean()
            > 70
        )
    ).astype(int)

    # Wind Std

    df["wind_6h_std"] = (
        df["windspeed_10m"]
        .rolling(6)
        .std()
    )

    # Simple risk proxies

    df["heavy_rain_risk"] = (
        df["rain"] > 10
    ).astype(int)

    df["pressure_instability"] = (
        df["pressure_change_6h"]
        .abs()
    )

    df["storm_intensity"] = (
        df["windspeed_10m"]
        *
        df["cloudcover"]
    )

    df["heat_index_proxy"] = (
        df["temperature_2m"]
        *
        (
            df["relative_humidity_2m"] / 100
        )
    )

    return df

def build_prediction_features(city):

    data = fetch_historical_weather(city)

    df = historical_to_dataframe(data)

    df = add_time_features(df)

    df = add_lag_features(df)

    df = add_rolling_features(df)

    df = add_change_features(df)

    df = add_rain_features(df)

    df = add_pressure_features(df)

    df = add_interaction_features(df)

    df = add_risk_features(df)

    df = add_remaining_features(df)

    df = df.fillna(0)

    latest_row = df.iloc[-1]
    feature_dict = latest_row.to_dict()
    
    missing_features = [

        col

        for col in EXPECTED_FEATURES

        if col not in feature_dict

    ]
    

   

    return latest_row.to_dict()