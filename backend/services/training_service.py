import pandas as pd
import joblib
import os
from services.historical_services import fetch_historical_data
from services.ml_service import (
    engineer_features,
    prepare_training_data,
    train_rain_model
)

# ============================================
# TRAIN MODEL FROM CSV
# ============================================

def train_model_from_csv():

    try:

        csv_path = (
            "data/all_india_weather.csv"
        )

        print(
            "Loading CSV dataset..."
        )

        df = pd.read_csv(csv_path)

        df["time"] = pd.to_datetime(
            df["time"]
        )

        print(
            f"Dataset loaded: {len(df)} rows"
        )

        print(
            "Engineering features..."
        )

        df = engineer_features(df)

        X, y = prepare_training_data(df)

        print(
            "Training XGBoost model..."
        )

        model, metrics = train_rain_model(
            X,
            y
        )

        from main import MODEL_METRICS

        MODEL_METRICS.clear()

        MODEL_METRICS.update(metrics)

        models_dir = os.path.join(

            os.path.dirname(__file__),

            "..",

            "models"
        )

        os.makedirs(
            models_dir,
            exist_ok=True
        )

        model_path = os.path.join(

            models_dir,

            "clidi_xgboost_model.joblib"
        )

        joblib.dump(
            model,
            model_path
        )

        print(
            f"Model saved to: {model_path}"
        )

        return {

            "model_path":
                model_path,

            "rows_used":
                len(df),

            "metrics":
                metrics
        }

    except Exception as e:

        print(
            f"Training error: {e}"
        )

        return None

    # ============================================
# LOAD TRAINED MODEL
# ============================================

def load_trained_model():

    try:

        model_path = os.path.join(

            os.path.dirname(__file__),

            "..",

            "models",

            "clidi_xgboost_model.joblib"
        )

        if not os.path.exists(model_path):

            print("Saved model not found")

            return None

        print("Loading trained XGBoost model...")

        model = joblib.load(model_path)

        return model

    except Exception as e:

        print(f"Model loading error: {e}")

        return None