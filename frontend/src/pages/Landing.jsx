import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md px-6 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold text-white">
                    Todo App
                </h1>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-white hover:underline cursor-pointer"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-white text-orange-500 px-4 py-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                        Signup
                    </button>
                </div>

            </div>

            {/* Center Content */}
            <div className="flex flex-1 flex-col items-center justify-center text-center px-4">

                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Organize Your Tasks <br />
                    <span className="text-orange-500">Effortlessly</span>
                </h1>

                <p className="text-gray-600 mb-6 max-w-md">
                    Stay productive and manage your daily tasks with ease.
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition cursor-pointer"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="border border-orange-500 text-orange-500 px-6 py-3 rounded-xl hover:bg-orange-100 transition cursor-pointer"
                    >
                        Login
                    </button>
                </div>

            </div>
        </div>
    );
}