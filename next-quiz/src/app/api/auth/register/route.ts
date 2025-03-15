import {db} from "@/drizzle/db";
import {UserTable} from "@/drizzle/schema/user";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import {LevelTable} from "@/drizzle/schema/role";
import {NextResponse} from "next/server";
import userCheck from "@/app/api/auth/register/userCheck";
import passwordCheck from "@/app/api/auth/register/passwordCheck";

export async function POST(req: Request) {
    const resp = {error: false, message: ""};

    try {
        const data = await req.json();

        const checkIfExists = await userCheck({username: data.userName, email: data.email});
        if (checkIfExists) {
            throw new Error("User already exists");
        }

        const pwCheck = passwordCheck({password: data.password, passwordCheck: data.passwordCheck});
        if (!pwCheck) {
            throw new Error("Passwords are incorrect.");
        }

        const role = await db.select({id: LevelTable.id}).from(LevelTable).where(eq(LevelTable.name, "user"));

        await db.insert(UserTable).values({
            name: data.userName,
            email: data.email,
            password: await bcrypt.hash(data.password, Number(process.env.SALT) || 10),
            roleId: role[0].id
        })
        resp.message = "User created successfully.";
    } catch (error) {
        console.log(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 400 : 201});
}
