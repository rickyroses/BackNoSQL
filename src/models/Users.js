import bcrypt from "bcryptjs"; // Libreria para hashear contrasenas
import mongoose from "mongoose";  

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    email: {
        type : String,
        required : true,
        unique: true,
        match: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type : String,
        required : true,
    },
});

// Funcion para hashear (transformar la contrasena a un texto ilegible)
//  antes de guardar el valor real de la contrasena en MongoDB
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 15);
        next();
});

const User = mongoose.model('User', UserSchema);
export default User;