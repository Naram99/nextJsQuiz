import { NextResponse } from "next/server";
import userSelect from "@/app/api/auth/login/userSelect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import setLoginTime from "@/app/api/auth/login/setLoginTime";

export async function POST(req: Request) {
    const data = await req.json();
    const resp = {
        error: false,
        message: "",
        user: "",
    };
    const secret = process.env.JWT_SECRET || "Y&cqxjDg2N}/?PBW.*L5MQ";
    let token = "";

    try {
        const userArr = await userSelect({ username: data.userName });

        if (Object.keys(userArr).length === 0) {
            throw new Error("User not found.");
        }
        const loginUser = userArr[0];
        console.log(loginUser);

        if (!(await bcrypt.compare(data.password, loginUser.password)))
            throw new Error("Wrong credentials.");

        resp.user = loginUser.userName;

        token = jwt.sign(
            {
                username: loginUser.userName,
                role: loginUser.role,
                id: loginUser.id,
            },
            secret,
            { expiresIn: "12h" }
        );

        const update = await setLoginTime({ userName: loginUser.userName });
        if (update.error) {
            throw new Error("Database error");
        }
    } catch (error) {
        console.log(error);
        resp.error = true;
        resp.message = error as string;
    }

    const response = NextResponse.json(resp, {
        status: resp.error ? 401 : 200,
    });
    if (token !== "") {
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 12 * 1000,
        });
    }

    return response;
}
