import {

    Routes,

    Route

} from "react-router-dom"

import RiskPrediction from "./pages/RiskPrediction"
import About from "./pages/About";
import Home from "./pages/Home"

import Dashboard from "./pages/Dashboard"
import WeatherAssistant from "./pages/WeatherAssistant";

function App() {

    return (

        <Routes>

            <Route

                path="/"

                element={<Home />}
            />

            <Route

                path="/dashboard"

                element={<Dashboard />}
            />

            <Route

                path="/risk"
                
                element={<RiskPrediction />}
            />
            <Route
                path="/assistant"
                element={<WeatherAssistant />}
            />
            <Route
                path="/about"
                element={<About />}
            />

        </Routes>
    )
}

export default App

