import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {jwtVerify} from "jose";
import {friendData} from "@/utils/friendData.type";
import friendSelect from "@/app/api/friends/methods/friendSelect";
import requestSelect from "@/app/api/friends/methods/requestSelect";

export async function GET() {
    // TODO: token verify extract
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const resp: {error: boolean, message: string, data: friendData} = {
        error: false,
        message: "",
        data: {
            accepted: [],
            requests: []
        }
    }

    try {
        if (!token)
            throw new Error("Unauthorized");

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedToken = await jwtVerify(token.value, secret);
        const username = decodedToken.payload.username as string;

        resp.data.accepted = await friendSelect(username);
        resp.data.requests = await requestSelect(username);

        console.log(resp.data);
    } catch (error) {
        console.error(error);
        resp.error = true;
        resp.message = error as string;
    }

    return NextResponse.json(resp, {status: resp.error ? 401 : 200});
}