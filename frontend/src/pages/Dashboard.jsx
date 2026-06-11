import { useState } from "react"
import { MdMyLocation } from "react-icons/md";
import dashboardBg from "../assets/images/dashboard-bg.jpg"

import {
    WiThermometer,
    WiHumidity,
    WiStrongWind,
    WiBarometer,
    WiCloud,
    WiRain,
    WiDaySunny,
    WiThunderstorm
} from "react-icons/wi";

import { FaMapMarkerAlt } from "react-icons/fa";

import {

    getWeatherPrediction,

    getForecast

} from "../services/api"

import { useNavigate } from "react-router-dom"

import {

    LineChart,

    Line,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    ResponsiveContainer

} from "recharts"


const Dashboard = () => {

    const navigate = useNavigate()

    const [city, setCity] = useState("")

    const [suggestions, setSuggestions] = useState([])

    const [weatherData, setWeatherData] = useState(null)

    const [forecastData, setForecastData] = useState([])


    const chartData = (forecastData || []).map(
        (item) => ({
            day: item.day,
            temperature: item.temp_max,
            humidity: item.humidity,
            wind_speed: item.wind_speed
        })
    )


    const handleSearch = async (e) => {

        const value = e.target.value

        setCity(value)

        if (value.length < 2) {

            setSuggestions([])

            return
        }

        try {

            const response = await fetch(

                `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=8e227c557db6f219dfd9b4ec6f91108e`
            )

            const data = await response.json()

            setSuggestions(data)

        } catch (error) {

            console.log(error)
        }
    }
    const getCurrentLocation = () => {

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {

                    const response = await fetch(

                        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=8e227c557db6f219dfd9b4ec6f91108e`

                    );

                    const data = await response.json();

                    if (data.length > 0) {

                        const cityName =
                            data[0].name
                                .replace(/ taluk/i, "")
                                .trim();

                        const detectedCity =
                            `${cityName},${data[0].country}`;

                        setCity(detectedCity);

                        const weather = await getWeatherPrediction(detectedCity);
                        const forecast = await getForecast(detectedCity);

                        setWeatherData(weather);
                        setForecastData(forecast.forecast || []);
                        setSuggestions([]);
                        

                    }

                } catch (error) {

                    console.log(error);

                }

            },

            () => {

                alert("Location access denied");

            }

        );

    };

    const handleAnalyze = async () => {

    if (!city) return

    try {

        const weather = await getWeatherPrediction(city)
        console.log("WEATHER RESPONSE:", weather);

        const forecast = await getForecast(city)
        console.log("FORECAST:", forecast)
        setWeatherData(weather)

        console.log("FORECAST RESPONSE:", forecast)

        setForecastData(forecast.forecast || [])

        setSuggestions([])

    } catch (error) {

        console.log(error)
    }
}

    const handleRiskPrediction = () => {

        navigate("/risk", {

            state: {

                city,

                weatherData,

                forecastData

            }

        })

    }
    console.log(forecastData)

    const getWeatherIcon = (rainProbability) => {

        if (rainProbability >= 70)
            return <WiRain size={40} className="text-cyan-400" />

        if (rainProbability >= 40)
            return <WiCloud size={40} className="text-gray-300" />

        return <WiDaySunny size={40} className="text-yellow-400" />
    }
      

    return (

        <div

            className="min-h-screen bg-cover bg-center relative"

            style={{

                backgroundImage:
                    `url(${dashboardBg})`
            }}
        >

            <div className="absolute inset-0 bg-black/45"></div>

            <div className="relative z-10 px-10 py-10">

                <h1 className="text-white text-7xl font-bold">

                    Climate Dashboard

                </h1>


                <div className="mt-16 flex gap-6">

                    <div className="relative w-full max-w-xl">

                        <input

                            value={city}

                            onChange={handleSearch}

                            placeholder="Enter City"

                            className="
                                w-full
                                pr-14
                                px-4
                                py-4
                                rounded-xl
                            "

                        />

                        <MdMyLocation

                            onClick={getCurrentLocation}

                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-3xl
                                text-gray-500
                                cursor-pointer
                                hover:text-indigo-500
                            "

                        />

                        {

                            suggestions.length > 0 && (

                                <div className="absolute top-24 w-full bg-white rounded-2xl overflow-hidden shadow-xl z-50">

                                    {

                                        suggestions.map(

                                            (item, index) => (

                                                <div

                                                    key={index}

                                                    onClick={() => {

                                                        setCity(item.name)

                                                        setSuggestions([])

                                                    }}

                                                    className="px-6 py-4 text-2xl hover:bg-cyan-100 cursor-pointer transition"

                                                >

                                                    {item.name}, {item.country}

                                                </div>

                                            )

                                        )

                                    }

                                </div>

                            )

                        }

                    </div>
                            
                        

                    


                    <button

                        onClick={handleAnalyze}

                        className="bg-cyan-500 hover:bg-cyan-400 text-white text-3xl px-12 rounded-2xl transition"
                    >

                        Analyze

                    </button>

                    <button

                        onClick={handleRiskPrediction}

                        disabled={!weatherData}

                        className={`
                            px-12
                            rounded-2xl
                            text-white
                            text-3xl
                            transition
                            ${
                                weatherData
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-gray-500 cursor-not-allowed"
                            }
                        `}
                    >

                        View Risk Prediction

                    </button>

                </div>


                {

                    weatherData && (

                        <div className="mt-16 grid grid-cols-3 gap-8">

                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl">

                                <h2 className="text-3xl font-semibold flex items-center gap-4">
                                    <WiThermometer
                                        size={48}
                                        className="text-red-400"
                                    />
                                    Temperature

                                </h2>

                                <p className="text-6xl mt-6 font-bold">

                                    {weatherData.temperature}°C

                                </p>

                            </div>


                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl">

                                <h2 className="text-3xl font-semibold flex items-center gap-4">
                                    <WiHumidity
                                        size={48}
                                        className="text-cyan-400"
                                    />
                                    Humidity

                                </h2>

                                <p className="text-6xl mt-6 font-bold">

                                    {weatherData.humidity}%

                                </p>

                            </div>


                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl">

                                <h2 className="text-3xl font-semibold flex items-center gap-4">
                                    <WiStrongWind
                                        size={48}
                                        className="text-green-400"
                                    />
                                    Wind Speed

                                </h2>

                                <p className="text-6xl mt-6 font-bold">

                                    {weatherData.wind_speed} m/s

                                </p>

                            </div>


                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl">

                                <h2 className="text-3xl font-semibold flex items-center gap-4">
                                    <WiBarometer
                                        size={48}
                                        className="text-yellow-400"
                                    />
                                    Pressure

                                </h2>

                                <p className="text-5xl mt-6 font-bold">

                                    {weatherData.pressure} hPa

                                </p>

                            </div>


                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl">

                                <h2 className="text-3xl font-bold flex items-center gap-2">
                                    <WiCloud
                                        size={48}
                                        className="text-gray-200"
                                    />
                                    Weather

                                </h2>

                                <p className="text-5xl font-bold mt-6">

                                    {

                                        weatherData?.description

                                            ?.split(" ")

                                            .map(

                                                word =>

                                                    word.charAt(0).toUpperCase()

                                                    + word.slice(1)
                                            )

                                            .join(" ")
                                    }

                                </p>

                            </div>



                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl">

                                <h2 className="text-3xl font-bold flex items-center gap-2">
                                    <FaMapMarkerAlt
                                        size={34}
                                        className="text-red-500"
                                    />
                                    City

                                </h2>

                                <p className="text-5xl font-bold mt-6">

                                    {weatherData.city}

                                </p>

                            </div>

                        </div>
                    )
                }


                {

                    forecastData.length > 0 && (

                        <div className="mt-20">

                            <div className="mb-10">

                                <h2 className="text-6xl font-bold text-white">

                                    7-Day Forecast

                                </h2>

                            </div>

                                    

                            <div className="flex gap-6 overflow-x-auto pb-4">

                                {

                                    forecastData.map(

                                        (item, index) => (

                                            <div

                                                key={index}

                                                className="bg-black/60 backdrop-blur-md rounded-3xl p-8 text-white shadow-xl"
                                            >

                                                <h3 className="text-2xl font-semibold">

                                                    {item.day}

                                                </h3>
                                                

                                                <p className="text-lg text-gray-300 mt-2">
                                                    {item.date}
                                                </p>

                                                <p className="text-5xl mt-6 font-bold">

                                                    {Math.round(
                                                        (item.temp_max + item.temp_min) / 2
                                                    )}°

                                                </p>

                                                

                                                <div className="flex flex-col items-center mt-5">

                                                    {getWeatherIcon(
                                                        item.rain_probability
                                                    )}

                                                    

                                                    <span className="text-sm text-gray-300">

                                                        {
                                                            item.rain_probability >= 70
                                                                ? "Rainy"
                                                                : item.rain_probability >= 40
                                                                ? "Cloudy"
                                                                : "Sunny"
                                                        }

                                                    </span>

                                                </div>

                                            </div>
                                            
                                        )
                                    )
                                }
                                <div className="flex justify-center mt-8">



                                </div>

                            </div>

                        </div>
                    )
                }


                {

                    forecastData.length > 0 && (

                        <div className="mt-24 mb-20">

                            <h2 className="text-white text-5xl font-bold mb-10">

                                Trend Analysis

                            </h2>

                            <div className="bg-black/60 backdrop-blur-md rounded-3xl p-10 h-[500px] shadow-xl">

                                <ResponsiveContainer width="100%" height="100%">

                                    <LineChart data={chartData}>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="day" />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="temperature"
                                            stroke="#00E5FF"
                                            strokeWidth={4}
                                            name="Temperature °C"
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="humidity"
                                            stroke="#4ADE80"
                                            strokeWidth={4}
                                            name="Humidity %"
                                        />

                                        <Line
                                            type="monotone"
                                            dataKey="wind_speed"
                                            stroke="#FF7A00"
                                            strokeWidth={4}
                                            name="Wind km/h"
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Dashboard