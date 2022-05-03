import mongoose from "mongoose";

/* const URI = 'mongodb://localhost/prueba';*/

const URI = 'mongodb+srv://root:yKFDW5E9PJO3ZlAs@cluster0.j2yun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


const connectDB = async() => {
    try {
        const db = await mongoose.connect(URI);
        console.log(`base de datos conectada' ${db.connect.name}`);
    } catch (error) {
        console.log(`error al conectar a la base de datos ${error.message}`)
    }
}

export default connectDB