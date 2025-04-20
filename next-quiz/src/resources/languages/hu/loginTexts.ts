import {loginData} from "@/utils/types/text/loginTextData.type";

export const loginTexts: loginData = {
    userName: "Felhasználónév",
    password: "Jelszó",
    passwordAgain: "Jelszó újra",
    oldPassword: "Eddigi jelszó",
    email: "Email cím",
    phone: "Telefonszám",
    login: "Belépés",
    register: "Regisztráció",
    gameCode: "Játék kód",
    join: "Csatlakozás",
    errorTexts: {
        userExists: "A felhasználó már létezik!",
        wrongCredentials: "Rossz felhasználónév, vagy jelszó!",
        dataMissing: "A mezőket kötelező kitölteni!",
        pwNotMatch: "A megadott jelszavak nem egyeznek!"
    }
}