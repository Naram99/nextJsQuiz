import jwt from 'jsonwebtoken';

export default async function verifyToken(token: string, key: string) {
    // const {jwtVerify} = await import("jose")
    const decodedToken = jwt.verify(token, key) as any;
    
    return {
        id: decodedToken.id,
        name: decodedToken.username,
        role: decodedToken.role,
    };
}
