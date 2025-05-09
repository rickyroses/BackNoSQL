import Post from "../models/Post.js";
import User from "../models/Users.js";

// Logica (1) Recuperar todos los posts de mongo con el modelo Post
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(
            {message: error.message});
    }
}

// Logica (2) Crear post en mongo con el modelo User
export const createPost = async (req, res) => {
    const {title, description, user} = req.body;


    // Verificacion de existencia del usuario
    const userID = await User.findById(user);
    if (!userID) {
        return res.status(404).json({message: `El usuario con ID ${user} no existe`});
    }
    
    // Creacion del Objeto Post
    const post = new Post({ 
        title, 
        description, 
        user: userID 
    });


    try {
        await post.save();
        res.status(200).json({message: 'Post creado exitosamente'});
    } catch (error) {
        res.status(400).json(
            {message: error.message});
    }
}