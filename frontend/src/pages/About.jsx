import Navbar from "../components/layout/Navbar";
import aboutBg from "../assets/images/about-bg.jpeg";

const About = () => {

    return (

        <div

            className="min-h-screen bg-cover bg-center relative"

            style={{

                backgroundImage: `url(${aboutBg})`

            }}

        >
            <Navbar />

            <div className="absolute inset-0 bg-black/65"></div>

            <div className="relative z-10 px-16 pt-32">

                {/* HERO SECTION */}

                <h1 className="text-white text-7xl font-bold max-w-5xl">

                    About Climate Risk Prediction System

                </h1>

                <p className="text-gray-200 text-2xl mt-8 max-w-4xl leading-relaxed">

                    An AI-powered climate intelligence platform that analyzes
                    real-time weather conditions, predicts rainfall probability,
                    identifies heatwave and storm risks, and provides actionable
                    recommendations through intelligent weather analytics.

                </p>

                <div className="flex gap-4 mt-10 flex-wrap">

                    <span className="bg-cyan-500/20 border border-cyan-400 px-5 py-3 rounded-xl text-white">
                        React
                    </span>

                    <span className="bg-cyan-500/20 border border-cyan-400 px-5 py-3 rounded-xl text-white">
                        FastAPI
                    </span>

                    <span className="bg-cyan-500/20 border border-cyan-400 px-5 py-3 rounded-xl text-white">
                        Machine Learning
                    </span>

                    <span className="bg-cyan-500/20 border border-cyan-400 px-5 py-3 rounded-xl text-white">
                        OpenWeather API
                    </span>

                    <span className="bg-cyan-500/20 border border-cyan-400 px-5 py-3 rounded-xl text-white">
                        Open-Meteo API
                    </span>

                </div>


                {/* PROJECT OVERVIEW */}

                <div className="mt-32">

                    <h2 className="text-white text-5xl font-bold">

                        Project Overview

                    </h2>

                    <div className="mt-10 bg-black/50 backdrop-blur-md rounded-3xl p-10 max-w-6xl">

                        <p className="text-gray-200 text-2xl leading-relaxed">

                            The Climate Risk Prediction System is an AI-powered web platform
                            designed to analyze real-time weather conditions and identify
                            potential environmental risks.

                            By combining live weather information, climate analytics,
                            and machine learning models, the system helps users understand
                            rainfall probability, heatwave conditions, and storm risks
                            through an intuitive dashboard and intelligent recommendations.

                        </p>

                    </div>

                </div>


                {/* KEY FEATURES */}

                <div className="mt-32">

                    <h2 className="text-white text-5xl font-bold mb-12">

                        Key Features

                    </h2>

                    <div className="grid grid-cols-3 gap-8">

                        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8">
                            <h3 className="text-3xl text-cyan-300 font-bold">
                                🌧 Rainfall Prediction
                            </h3>
                            <p className="text-gray-200 text-xl mt-4">
                                Predicts rainfall probability using weather parameters and climate analytics.
                            </p>
                        </div>

                        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8">
                            <h3 className="text-3xl text-cyan-300 font-bold">
                                🌩 Storm Detection
                            </h3>
                            <p className="text-gray-200 text-xl mt-4">
                                Identifies potential storm conditions based on atmospheric indicators.
                            </p>
                        </div>

                        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8">
                            <h3 className="text-3xl text-cyan-300 font-bold">
                                🔥 Heatwave Monitoring
                            </h3>
                            <p className="text-gray-200 text-xl mt-4">
                                Detects extreme temperature conditions and heatwave risks.
                            </p>
                        </div>

                        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8">
                            <h3 className="text-3xl text-cyan-300 font-bold">
                                📈 Climate Trend Analysis
                            </h3>
                            <p className="text-gray-200 text-xl mt-4">
                                Visualizes weather trends through interactive analytics.
                            </p>
                        </div>

                        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8">
                            <h3 className="text-3xl text-cyan-300 font-bold">
                                🤖 AI Weather Assistant
                            </h3>
                            <p className="text-gray-200 text-xl mt-4">
                                Provides intelligent weather recommendations and answers.
                            </p>
                        </div>

                        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8">
                            <h3 className="text-3xl text-cyan-300 font-bold">
                                📍 Location Intelligence
                            </h3>
                            <p className="text-gray-200 text-xl mt-4">
                                Supports city-based forecasting and GPS-assisted location detection.
                            </p>
                        </div>

                    </div>

                </div>


                {/* HOW IT WORKS */}

                <div className="mt-32">

                    <h2 className="text-white text-5xl font-bold mb-12">

                        How It Works

                    </h2>

                    <div className="bg-black/50 backdrop-blur-md rounded-3xl p-12">

                        <div className="flex flex-col items-center text-center space-y-6">

                            <div className="text-6xl">👤</div>
                            <h3 className="text-white text-2xl font-semibold">User</h3>

                            <div className="text-cyan-400 text-5xl">↓</div>

                            <div className="text-6xl">📊</div>
                            <h3 className="text-white text-2xl font-semibold">Dashboard</h3>

                            <div className="text-cyan-400 text-5xl">↓</div>

                            <div className="text-6xl">📍</div>
                            <h3 className="text-white text-2xl font-semibold">Location Detection</h3>

                            <div className="text-cyan-400 text-5xl">↓</div>

                            <div className="text-6xl">☁️</div>
                            <h3 className="text-white text-2xl font-semibold">Weather APIs</h3>

                            <div className="text-cyan-400 text-5xl">↓</div>

                            <div className="text-6xl">🧠</div>
                            <h3 className="text-white text-2xl font-semibold">ML Analysis</h3>

                            <div className="text-cyan-400 text-5xl">↓</div>

                            <div className="text-6xl">⚠️</div>
                            <h3 className="text-white text-2xl font-semibold">Risk Assessment</h3>

                            <div className="text-cyan-400 text-5xl">↓</div>

                            <div className="text-6xl">🤖</div>
                            <h3 className="text-white text-2xl font-semibold">AI Assistant</h3>

                        </div>

                    </div>

                </div>


                {/* DEVELOPER */}

                <div className="mt-32 mb-20">

                    <h2 className="text-white text-5xl font-bold mb-12">

                        Developer Contact

                    </h2>

                    <div className="bg-black/50 backdrop-blur-md rounded-3xl p-10 max-w-4xl">

                        <h3 className="text-cyan-300 text-4xl font-bold">

                            Deekshitha

                        </h3>

                        <p className="text-gray-200 text-2xl mt-6">

                            📧 Email: your-email@gmail.com

                        </p>

                        <p className="text-gray-200 text-2xl mt-4">

                            📱 Contact: +91 XXXXX XXXXX

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default About;