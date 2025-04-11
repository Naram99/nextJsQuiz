import {loginData} from "@/utils/loginData.type";

export const loginTexts: loginData = {
    userName: "Username",
    password: "Password",
    passwordAgain: "Password again",
    oldPassword: "Current password",
    email: "Email address",
    phone: "Phone number",
    login: "Login",
    register: "Register",
    gameCode: "Game code",
    join: "Join game",
    errorTexts: {
        userExists: "User already exists!",
        wrongCredentials: "Wrong username or password!",
        dataMissing: "All fields must be filled!",
        pwNotMatch: "Passwords do not match!"
    }
}