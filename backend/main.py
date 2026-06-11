from fastapi import FastAPI

from services.live_feature_service import (
    fetch_historical_weather,
    historical_to_dataframe,
    add_time_features,
    add_lag_features,
    add_rolling_features,
    add_change_features,
    add_rain_features,
    add_pressure_features,
    add_interaction_features,
    add_risk_features,
    add_remaining_features
)
from services.ml_service import (
    predict_rainfall,
    EXPECTED_FEATURES
)
from fastapi.middleware.cors import CORSMiddleware

from services.weather_service import (
    get_current_weather
)

from services.ml_service import (
    predict_rainfall
)



from services.weather_service import (
    get_7_day_forecast
)

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

@app.get("/")
def home():

    return {

        "message":
            "Climate Pattern Analysis API Running"
    }

@app.get("/predict/{city}")
def predict(city: str):

    try:

        weather = get_current_weather(city)

        

        from services.live_feature_service import (
            build_prediction_features
        )

        feature_dict = build_prediction_features(
            city
        )
        feature_dict["description"] = weather["description"]


        


        result = predict_rainfall(feature_dict)
        result["heatwave_risk"] = (

            weather["current_temp"] >= 38

            and

            weather["humidity"] < 50
        )

        result["storm_risk"] = (

            (
                weather["humidity"] >= 80

                and

                weather["clouds"] >= 80
            )

            or

            (
                "thunderstorm"
                in weather["description"].lower()
            )
        )
        return {

            "city":
                weather.get("city", city),

            "temperature":
                weather.get("current_temp", 0),

            "humidity":
                weather.get("humidity", 0),

            "pressure":
                weather.get("pressure", 0),

            "wind_speed":
                weather.get("wind_speed", 0),

            "cloud_cover":
                weather.get("clouds", 0),

            "description":
                weather.get("description", ""),

            "rain_prediction":
                result.get("rain_prediction", 0),

            "rain_probability":
                result.get("rain_probability", 0),

            "storm_risk":
                result.get("storm_risk", False),

            "heatwave_risk":
                result.get("heatwave_risk", False)
        }

    except Exception as e:

        return {
            "error": str(e)
        }
    
@app.get("/forecast/{city}")
def forecast(city: str):

    try:

        weather = get_current_weather(city)

        data = get_7_day_forecast(

            weather["lat"],
            weather["lon"]

        )

        return {

            "forecast": data

        }

    except Exception as e:

        return {

            "error": str(e)

        }
    
@app.get("/history/{city}")
def history(city: str):

    return fetch_historical_weather(city)

@app.get("/historydf/{city}")
def history_df(city: str):

    data = fetch_historical_weather(city)

    df = historical_to_dataframe(data)

    return {

        "rows":
            len(df),

        "columns":
            list(df.columns)
    }

@app.get("/testfeatures/{city}")
def test_features(city: str):

    data = fetch_historical_weather(city)

    df = historical_to_dataframe(data)

    df = add_time_features(df)



    return {

        "columns":
            list(df.columns)

    }

@app.get("/testlags/{city}")
def test_lags(city: str):

    data = fetch_historical_weather(city)

    df = historical_to_dataframe(data)

    df = add_time_features(df)

    df = add_lag_features(df)

    return {

        "columns":
            list(df.columns)

    }

@app.get("/testrolling/{city}")
def test_rolling(city: str):

    data = fetch_historical_weather(city)

    df = historical_to_dataframe(data)

    df = add_time_features(df)

    df = add_lag_features(df)

    df = add_rolling_features(df)

    return {

        "total_columns":
            len(df.columns),

        "columns":
            list(df.columns)

    }

@app.get("/testpipeline/{city}")
def test_pipeline(city: str):

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
    return {

        "total_columns":
            len(df.columns)

    }

@app.get("/missingfeatures")
def missing_features():

    data = fetch_historical_weather("Bengaluru")

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
    
    generated_features = set(df.columns)

    missing = [

        feature

        for feature in EXPECTED_FEATURES

        if feature not in generated_features

    ]

    return {

        "missing_count": len(missing),

        "missing_features": missing

    }