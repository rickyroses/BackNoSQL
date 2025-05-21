import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { keyToken } from "../config/constants";


export const protect = async (req, resizeBy, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
             // Get token from header
            token = req.headers.authorization.split("")[1];
            const decoded = jwt.verify(token, keyToken);

            req.user = await User.findById(decoded.id).select("-password"); // -password to not return the password
            next();

        } catch (error){
            resizeBy.status(401).json({message: 'Not authorized, token failed'});
        }
    }
    if (!token) {
        resizeBy.status(401).json({message: 'Not authorized, no token'});
    }
}

