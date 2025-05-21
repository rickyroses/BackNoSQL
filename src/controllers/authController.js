import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import { keyToken } from "../config/constants.js";
import bcrypt from "bcryptjs";


const generateToken = (user) => {
    return jwt.sign({id}, keyToken, { expiresIn: '30d' });
};

// Logica (1) Registrar un Usuario al sistema
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        res.status(400).json({message: 'User already exists'});
    }
    
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            tokenAccess: generateToken(user._id),
        });
    }
    else {
            res.status(400).json({message: 'Invalid user data'});
        };
};

// Logica (2) nos logeamos a nuestra app
export const authenticateUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    console.log("USUARIO: "+user)
    console.log(`Contrasena: ${password}`)
    console.log (`y Contrasena Cifrada guardada en DB: ${user.password}`)

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            tokenAccess: generateToken(user._id),
        });
    } else {
        res.status(400).json({message: 'Invalid email or password'});
    }

}
