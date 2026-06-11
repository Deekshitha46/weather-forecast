import axios from "axios";

const API_KEY = "6340c407ed0f44fa84e112443262805";

export const getWeatherData = async (location) => {

  try {

    const response = await axios.get(

      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`

    );

    return response.data;

  } catch (error) {

    console.log(error);

    return null;
  }
};