const BASE_URL = "http://127.0.0.1:8000"


export const getWeatherPrediction = async (city) => {

    const response = await fetch(

        `${BASE_URL}/predict/${city}`
    )

    return response.json()
}


export const getForecast = async (city) => {

    const response = await fetch(

        `${BASE_URL}/forecast/${city}`
    )

    return response.json()
}