import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const QrInventoryLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            navigate(redirectTo, { replace: true });
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Inventory Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block mb-2 p-2 border w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block mb-4 p-2 border w-full"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default QrInventoryLogin;
