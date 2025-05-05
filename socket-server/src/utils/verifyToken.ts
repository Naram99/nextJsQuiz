export default async function verifyToken(token: string, key: string) {
    const {jwtVerify} = await import("jose")

    const secret = new TextEncoder().encode(key);
    const decodedToken = await jwtVerify(token, secret);

    return {
        id: decodedToken.payload.id,
        name: decodedToken.payload.name,
        role: decodedToken.payload.role,
    };
}
