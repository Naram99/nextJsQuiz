import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import userCheck from "@/app/api/auth/register/userCheck";
import passwordCheck from "@/app/api/auth/register/passwordCheck";
import bcrypt from "bcrypt";

export async function PUT(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    const data = await req.json();
    const resp = {
        error: false,
        message: ""
    }
    // TODO: Update profile

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);

        if (!decodedToken)
            throw new Error("Unauthorized");

        const check = await userCheck({username: data.name, email: data.email})
        if (check)
            throw new Error("Cannot use data from an existing profile.");

        // TODO: Old password check

        const pwCheck = passwordCheck({
            password: data.newPassword,
            passwordCheck: data.passwordCheck
        })
        if (!pwCheck)
            throw new Error("Wrong new password");

        await db.update(UserTable).set({
            name: data.name,
            email: data.email,
            password: await bcrypt.hash(data.newPassword, Number(process.env.SALT) || 10),
            phone: data.phone,
            profilePicture: data.profilePicture,
        })
    } catch (error) {
        console.error(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: 200});
}