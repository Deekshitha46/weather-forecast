import climateBg from "../../assets/images/climate-bg.jpg"

import {

    useNavigate

} from "react-router-dom"

const HeroSection = () => {
const navigate = useNavigate()
    return (

        <section

            className="relative h-screen bg-cover bg-center flex items-center justify-center"

            style={{

                backgroundImage: `url(${climateBg})`
            }}
        >

            <div className="absolute inset-0 bg-black/45"></div>

            <div className="relative z-10 text-center px-4">

                <h1 className="text-white text-8xl font-bold leading-tight">

                    Climate Intelligence Platform
                </h1>

                <p className="text-white text-3xl mt-8 max-w-5xl mx-auto">

                    AI Powered Climate Pattern Analysis & Extreme Weather Risk Prediction
                </p>

                <button

                onClick={() => navigate("/dashboard")}

                className="mt-14 bg-cyan-500 hover:bg-cyan-400 text-white text-3xl px-16 py-5 rounded-3xl transition duration-300"
            >

                    Explore Now
                </button>

            </div>

        </section>
    )
}

export default HeroSection