import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    return (

        <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6">

            <h1 className="text-white text-5xl font-bold">

                Climate AI

            </h1>

            <div className="flex gap-8 items-center">

                <button
                    onClick={() => navigate("/")}
                    className="text-white text-xl hover:text-cyan-300 transition"
                >

                    Home

                </button>

                <button
                    onClick={() => navigate("/about")}
                    className="text-white text-xl hover:text-cyan-300 transition"
                >

                    About

                </button>

                

            </div>

        </nav>
    )
}

export default Navbar