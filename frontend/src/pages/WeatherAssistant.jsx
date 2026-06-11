import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/WeatherAssistant.css";

function WeatherAssistant() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedCity =
    location.state?.city || "";
  const passedWeather =
    location.state?.weatherData || null;
  console.log("LOCATION STATE =", location.state);

  console.log("PASSED WEATHER =", passedWeather);


  const [city, setCity] =
    useState(passedCity);

  const [weather, setWeather] =
    useState(passedWeather);

  const [answer, setAnswer] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [question, setQuestion] = useState("");

  const [chatAnswer, setChatAnswer] = useState("");



  const API_KEY = "6340c407ed0f44fa84e112443262805";



  // FETCH CITY SUGGESTIONS

  const fetchSuggestions = async (value) => {

    setCity(value);

    if (value.length < 2) {

      setSuggestions([]);

      return;
    }

    try {

      const response = await fetch(

        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`

      );

      const data = await response.json();

      setSuggestions(data);

    }

    catch {

      setSuggestions([]);

    }
  };



  // GET WEATHER + AI RESPONSE

  const getWeather = async (
    searchCity = city
  ) => {

    try {

      const response = await fetch(

        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCity}`

      );

      const data = await response.json();



      if (data.error) {

        setAnswer("Location not found");

        return;
      }



      setWeather(data);



      const condition =

        data.current.condition.text.toLowerCase();



      let aiResponse = "";



      if (

        condition.includes("rain") ||

        condition.includes("storm")

      ) {

        aiResponse =

          "Heavy rainfall chances are present. Outdoor jogging, outings, and long travel are not recommended now.";

      }



      else if (

        condition.includes("cloud")

      ) {

        aiResponse =

          "Weather is cloudy. You can go outside but keep an umbrella for safety.";

      }



      else if (

        condition.includes("sunny") ||

        condition.includes("clear")

      ) {

        aiResponse =

          "Weather is clear and pleasant. Good time for jogging, shopping, walking, outings, and fresh air.";

      }



      else if (

        condition.includes("fog")

      ) {

        aiResponse =

          "Fog detected. Visibility may reduce. Avoid high-speed driving and long-distance travel.";

      }



      else if (

        condition.includes("snow")

      ) {

        aiResponse =

          "Snowfall conditions detected. Travel and outdoor activities should be done carefully.";

      }



      else {

        aiResponse =

          "Current weather conditions appear stable.";

      }



      setAnswer(aiResponse);

    }

    catch (error) {

      setAnswer("API Connection Failed");

    }

  };
  const askAI = () => {

  if (!weather) {

    setChatAnswer(
      "Please predict weather first."
    );

    return;
  }

  const condition =
    weather.description.toLowerCase();

  const temp =
    weather.temperature;

  const q =
    question.toLowerCase();



  // WEATHER RISK ANALYSIS

  let risk = "safe";



  if (

    condition.includes("rain") ||
    condition.includes("storm") ||
    condition.includes("thunder") ||
    condition.includes("fog") ||
    condition.includes("mist") ||
    condition.includes("drizzle")

  ) {

    risk = "unsafe";

  }



  // COLD CONDITIONS

  if (
    temp < 15
  ) {

    risk = "cold";

  }



  // VERY HOT CONDITIONS

  if (
    temp > 35
  ) {

    risk = "hot";

  }



  // ANSWER GENERATION

  if (

    q.includes("jog") ||
    q.includes("run") ||
    q.includes("walk") ||
    q.includes("cycle") ||
    q.includes("cycling") ||
    q.includes("bicycle") ||
    q.includes("bike") ||
    q.includes("riding") ||
    q.includes("play")

  ) {

    if (risk === "unsafe") {

      setChatAnswer(
        "Current weather conditions are not suitable for outdoor physical activities."
      );

    }

    else if (risk === "hot") {

      setChatAnswer(
        "Temperature is very high currently. Outdoor activities may cause dehydration."
      );

    }

    else if (risk === "cold") {

      setChatAnswer(
        "Weather is too cold for comfortable outdoor activity."
      );

    }

    else {

      setChatAnswer(
        "Weather conditions look good for outdoor activities."
      );

    }

  }



  else if (

    q.includes("shopping") ||
    q.includes("outing") ||
    q.includes("trip") ||
    q.includes("travel") ||
    q.includes("friends")

  ) {

    if (risk === "unsafe") {

      setChatAnswer(
        "Weather conditions may affect travel and outdoor plans. Carry safety equipment if necessary."
      );

    }

    else {

      setChatAnswer(
        "Current weather conditions look comfortable for outings and travelling."
      );

    }

  }



  else {

    setChatAnswer(
      `Current weather in ${weather.city} is ${weather.description} with temperature ${weather.temperature}°C.`
    );

  }

};


  return (

    <div className="assistant-container">

      <div className="assistant-box">

        <div className="flex justify-end mb-6">

          <button

              onClick={() => navigate("/")}

              className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  text-lg
                  transition
              "

          >

              Back to home

          </button>

      </div>



        <h1>

          AI Climate Assistant

        </h1>



        {/* SEARCH INPUT */}



        <div className="text-3xl font-semibold mb-6">

            📍 {city}

            </div>



        {/* SUGGESTIONS */}



        <div className="suggestions-box">

          {suggestions.map((item, index) => (

            <div

              key={index}

              className="suggestion-item"

              onClick={() => {

                setCity(item.name);

                setSuggestions([]);

              }}

            >

              {item.name}, {item.region}

            </div>

          ))}

        </div>



        {/* BUTTON */}







        {/* WEATHER RESULT */}



        {weather && (

          <div className="weather-result">



            <h2>

              {weather.city}

            </h2>



            <p>

              Temperature:

              {weather.temperature} °C

            </p>



            <p>

              Condition:

              {weather.description}

            </p>



            <p>

              Humidity:

              {weather.humidity}%

            </p>



            <p>

              Wind Speed:

              {weather.wind_speed} km/h

            </p>

          </div>

        )}



        {/* AI CHATBOT RESPONSE */}

<        div className="ai-response">

         

          

            <input
             type="text"
             placeholder="Ask AI anything..."
             value={question}
             onChange={(e) =>
                setQuestion(e.target.value)
             }
            />

             <button onClick={askAI}>

             Ask AI

             </button>

             <p style={{ marginTop: "20px" }}>

               {chatAnswer}

                </p>

               </div>



        <div className="ai-response">



          <h2>

            AI Assistant

          </h2>



          <p>

            {answer}

          </p>

        </div>



      </div>

    </div>

  );

}



export default WeatherAssistant;