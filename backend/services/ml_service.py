import joblib
import pandas as pd


MODEL_PATH = (
    "models/final_weather_xgboost_model.pkl"
)

model = joblib.load(
    MODEL_PATH
)

EXPECTED_FEATURES = (
    model.get_booster().feature_names
)
print("MODEL FEATURES:")
print(EXPECTED_FEATURES)


def predict_rainfall(feature_dict):
    

    feature_names = model.get_booster().feature_names

    input_df = pd.DataFrame([feature_dict])

    input_df = input_df.reindex(
        columns=feature_names,
        fill_value=0
    )
    

    probability = model.predict_proba(
        input_df
    )[0][1]
    

    prediction = model.predict(input_df)[0]

   


    rain_probability = round(
        float(probability) * 100,
        2
    )


    humidity = feature_dict.get(
        "relative_humidity_2m",
        feature_dict.get("humidity", 0)
    )

    clouds = feature_dict.get(
        "cloudcover",
        feature_dict.get("cloud_cover", 0)
    )

    wind_speed = feature_dict.get(
        "windspeed_10m",
        feature_dict.get(
            "wind_speed",
            0
        )
    )

    temperature = feature_dict.get(
        "temperature_2m",
        feature_dict.get(
            "current_temp",
            0
        )
    )

    weather_condition = str(

        feature_dict.get(
            "description",
            ""
        )

    ).lower()


    rain_prediction = (

        probability > 0.25

        or

        (
            humidity > 75
            and
            clouds > 35
        )

        or

        (
            "rain" in weather_condition
            or
            "drizzle" in weather_condition
            or
            "thunderstorm" in weather_condition
            or
            "cloud" in weather_condition
        )
    )


    storm_risk = (

        (
            humidity >= 70
            and
            wind_speed > 20
            and
            clouds >= 70
        )

        or

        (
            "thunderstorm" in weather_condition
        )
    )
    


    heatwave_risk = (

        temperature >= 38

        and

        humidity < 50
    )
    if rain_probability < 5:

        risk_level = "Low"

    elif rain_probability < 15:

        risk_level = "Moderate"

    else:

        risk_level = "High"


    return {

        "rain_prediction":
            int(rain_prediction),

        "rain_probability":
            rain_probability,

        "risk_level":
            risk_level,

        "storm_risk":
            bool(storm_risk),

        "heatwave_risk":
            bool(heatwave_risk)
    }

