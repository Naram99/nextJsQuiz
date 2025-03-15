import {NextResponse} from "next/server";
import userSelect from "@/app/api/auth/login/userSelect";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const data = await req.json();
    const resp = {
        error: false,
        message: ""
    }
    console.log(data);

    try {
        const userArr = await userSelect({username: data.userName})

        if (Object.keys(userArr).length === 0) {
            throw new Error("User not found.");
        }
        const loginUser = userArr[0];
        console.log(loginUser);

        if (!await bcrypt.compare(data.password, loginUser.password)) {
            throw new Error("Wrong credentials.");
        } else {
            console.log("Correct password");
        }

        // TODO: HTTP-only cookie return

    } catch (error) {
        console.log(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 401 : 200});
}