import {loginError} from "@/utils/loginError.type";

export const loginErrorTexts: loginError = {
    userExists: "A felhasználó már létezik!",
    wrongCredentials: "Rossz felhasználónév, vagy jelszó!",
    dataMissing: "A mezőket kötelező kitölteni!",
    pwNotMatch: "A megadott jelszavak nem egyeznek!"
}