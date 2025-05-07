import mongoose from 'mogoose';
import {mongoDomain, mongoUser, mongoPWD, mongoDB} from '.constants.js';

const connectDB = async () => {
    try {
        await mongoose.connect(`${mongoDomain}${mongoUser}:${mongoPWD}@${mongoDB}/`);
    
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;