import axios from "axios";

import ApiConstants from "../constants/ApiConstants"

const AuthRequest = axios.create({
    baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});

const register = async (user) => {

    if (!user?.username || !user?.email || !user?.password)
        return { status: false, message: "Please fill up all the fields" };
    try {
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password,
        }
        let registerResponse = await AuthRequest.post(ApiConstants.BACKEND_API.REGISTER,
            requestBody);
        console.log("registerResponse?.data");
        return registerResponse?.data;
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: "Oops! Something went wrong",
            error: error?.toString()
        }
    }
}

const login = async user => {
    if (!user?.username || !user?.password) {
        return { status: false, message: 'Please fill up all fields' };
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password,
        };
        let loginResponse = await AuthRequest.post(
            ApiContants.BACKEND_API.LOGIN,
            requestBody,
        );
        return loginResponse?.data;
    } catch (error) {
        console.log(error);
        return { status: false, message: 'Oops! Something went wrong' };
    }
};

export default {register, login}