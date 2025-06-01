import { Secret, sign } from "jsonwebtoken";


const {JWT_SECRET : JWT_SECRET}  = process.env;

const generatToken = async( id: string) => {
    return await sign({id}, JWT_SECRET as Secret)
}

export default generatToken;