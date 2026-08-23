import axios from "axios"

export type LoginRequest = {
    email : string
    password : string
}

export const Login = async (creds: LoginRequest) => {
    const resp = await axios({url: 'http://localhost:8080/api/auth/login', method: "post", data: creds});
    
    return resp;
}