import React from "react";
import Home from "./home";
import Login from "./login";
import { useAuth } from "./context/AuthContext";

export default function Index() {
    const { token, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Login />;
    }

    return <Home />;
}