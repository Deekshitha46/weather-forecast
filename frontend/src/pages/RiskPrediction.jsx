import riskBg from "../assets/images/risk-bg.jpg"

import { useLocation, useNavigate } from "react-router-dom";

import {
  FaCloudRain,
  FaTemperatureHigh,
  FaBolt
} from "react-icons/fa";

import {
  WiRaindrop
} from "react-icons/wi";

import {
  MdWarning
} from "react-icons/md";

const RiskPrediction = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const { city, weatherData } = location.state || {}
    let climateRiskScore = 0

    climateRiskScore += weatherData?.rain_probability || 0

    if (weatherData?.heatwave_risk)
        climateRiskScore += 30

    if (weatherData?.storm_risk)
        climateRiskScore += 40

    climateRiskScore = Math.min(
        100,
        Math.round(climateRiskScore)
    )

    let climateRiskLevel = "Low"

    if (climateRiskScore > 60)
        climateRiskLevel = "High"

    else if (climateRiskScore > 30)
        climateRiskLevel = "Moderate"


    return (

        <div

            className="min-h-screen bg-cover bg-center relative"

            style={{

                backgroundImage:
                    `url(${riskBg})`
            }}
        >

            <div className="absolute inset-0 bg-black/50"></div>


            <div className="relative z-10 p-10 text-white">

                <h1 className="text-5xl font-bold mb-4">

                    AI Climate Risk Prediction

                </h1>


                <p className="text-xl mb-8 text-gray-300">

                    City: {city}

                </p>

            <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">

                <h2 className="text-xl text-gray-300">

                    Overall Climate Risk Score

                </h2>

                <div className="flex items-center justify-between mt-3">

                    <p className="text-5xl font-bold text-cyan-400">

                        {climateRiskScore}/100

                    </p>

                    <p
                        className={`text-2xl font-bold ${
                            climateRiskLevel === "High"
                                ? "text-red-400"
                                : climateRiskLevel === "Moderate"
                                ? "text-yellow-400"
                                : "text-green-400"
                        }`}
                    >

                        {climateRiskLevel}

                    </p>

                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mt-4">

                    <div

                        className={`h-3 rounded-full ${
                            climateRiskLevel === "High"
                                ? "bg-red-500"
                                : climateRiskLevel === "Moderate"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        }`}

                        style={{
                            width: `${climateRiskScore}%`
                        }}

                    ></div>

                </div>

            </div>



                <div className="grid grid-cols-4 gap-6">


                    <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-10">

                        <h2 className="text-xl font-semibold text-gray-300">

                            Rain Prediction

                        </h2>

                        <p className="text-3xl font-bold mt-4 text-cyan-400">

                            {

                                weatherData?.rain_prediction === 1

                                    ? "Rain Expected"

                                    : "No Rain"
                            }

                        </p>

                    </div>



                    <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-10">

                        <h2 className="text-xl font-semibold text-gray-300">

                            Rain Probability

                        </h2>

                        <p className="text-3xl font-bold mt-4 text-cyan-400">

                            {weatherData?.rain_probability}%

                        </p>

                    </div>



                    <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-10">

                        <h2 className="text-xl font-semibold text-gray-300">

                            Heatwave Risk

                        </h2>

                        <p
                            className={`text-3xl font-bold mt-4 ${
                                weatherData?.heatwave_risk
                                    ? "text-orange-400"
                                    : "text-green-400"
                            }`}
                        >

                            {

                                weatherData?.heatwave_risk

                                    ? "High"

                                    : "Low"
                            }

                        </p>

                    </div>



                    <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-10">

                        <h2 className="text-xl font-semibold text-gray-300">

                            Storm Risk

                        </h2>

                        <p
                            className={`text-3xl font-bold mt-4 ${
                                weatherData?.storm_risk
                                    ? "text-red-400"
                                    : "text-green-400"
                            }`}
                        >

                            {

                                weatherData?.storm_risk

                                    ? "High"

                                    : "Low"
                            }

                        </p>

                    </div>

                </div>



                <div className="mt-20 bg-white/10 backdrop-blur-lg rounded-3xl p-10">

                    <h2 className="text-5xl font-bold mb-10">

                        AI Climate Insights & Recommendations

                    </h2>



                    {

                        weatherData?.storm_risk && (

                            <div className="bg-red-500/20 border border-red-400 rounded-3xl p-8 mb-8">

                                <h3 className="text-4xl font-bold text-red-300">

                                    ⚠ High Storm Risk Detected

                                </h3>

                                <p className="text-2xl mt-5 leading-relaxed">

                                    Strong winds and unstable atmospheric conditions are expected.
                                    Outdoor activities should be minimized during severe conditions.

                                </p>

                                <ul className="text-2xl mt-6 space-y-3 list-disc list-inside">

                                    <li>Avoid unnecessary travel during heavy storms</li>

                                    <li>Stay updated with emergency weather alerts</li>

                                    <li>Secure outdoor objects and vehicles</li>

                                </ul>

                            </div>
                        )
                    }



                    {

                        weatherData?.heatwave_risk && (

                            <div className="bg-black/70 border border-orange-400 rounded-3xl p-8 mb-8">

                                <h3 className="text-4xl font-bold text-orange-300">

                                    ☀ Heatwave Warning

                                </h3>

                                <p className="text-2xl mt-5 leading-relaxed">

                                    Extremely high temperatures may affect health and outdoor activities.
                                    Heat exhaustion risk is elevated.

                                </p>

                                <ul className="text-2xl mt-6 space-y-3 list-disc list-inside">

                                    <li>Drink plenty of water regularly</li>

                                    <li>Avoid direct sunlight during afternoon hours</li>

                                    <li>Wear light-colored and breathable clothing</li>

                                </ul>

                            </div>
                        )
                    }



                    {

                        weatherData?.rain_prediction === 1 && (

                            <div className="bg-black/70 border border-cyan-400 rounded-3xl p-8 mb-8">

                                <h3 className="text-4xl font-bold text-cyan-300">

                                    🌧 Rainfall Advisory

                                </h3>

                                <p className="text-2xl mt-5 leading-relaxed">

                                    Rainfall is likely in the upcoming hours.
                                    Reduced visibility and slippery roads may occur.

                                </p>

                                <ul className="text-2xl mt-6 space-y-3 list-disc list-inside">

                                    <li>Carry umbrellas or rain protection</li>

                                    <li>Drive cautiously during low visibility</li>

                                    <li>Monitor local flood-prone regions</li>

                                </ul>

                            </div>
                        )
                    }



                    {

                        !weatherData?.storm_risk &&
                        !weatherData?.heatwave_risk &&
                        weatherData?.rain_prediction !== 1 && (

                            <div className="bg-green-500/20 border border-green-400 rounded-3xl p-8">

                                <h3 className="text-4xl font-bold text-green-300">

                                    ✅ Stable Climate Conditions

                                </h3>

                                <p className="text-2xl mt-5 leading-relaxed">

                                    Current climate indicators suggest stable and safe weather conditions.
                                    No major environmental risks detected at this time.

                                </p>

                            </div>
                        )
                    }
                    <div className="flex justify-center mt-8">

                    <button

                        onClick={() =>
                            navigate("/assistant", {
                                state: {
                                    city: weatherData?.city,
                                    weatherData: weatherData
                                }
                            })
                        }

                        className="
                            bg-indigo-600
                            hover:bg-indigo-700
                            text-white
                            px-10
                            py-4
                            rounded-2xl
                            text-xl
                            font-semibold
                            transition
                            shadow-lg
                        "

                    >

                        🤖 Weather Assistant

                    </button>

                </div>


                </div>

            </div>

        </div>

        
    )
}

export default RiskPrediction


