import axios from "axios";
import { jwtDecode } from "jwt-decode";

export type JWTPayload = {
    sub: string;
    email: string;
    iat: number;
    exp: number;
};

export async function getUserCreds() {
    const token = localStorage.getItem("token");

    if (token) {
        return jwtDecode<JWTPayload>(token);
    }

    else return null
}

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;