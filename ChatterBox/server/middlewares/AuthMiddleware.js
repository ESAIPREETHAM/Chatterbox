import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next)=>{
    const token = request.cookies.jwt;

    if(!token){
        return response.status(401).send("You are not authenticated!");
    }
    
    jwt.verify(token, process.env.JWT_KEY, async(error, payload)=>{
        if(error){
            return response.status(403).send("Token is invalid");
        }

        request.userId = payload.userId;
        next();
    })
}