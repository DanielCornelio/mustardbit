import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './database.js';
import userRoute from './routes/usuario.route.js'
import employeeRoute from './routes/empleado.route.js'

connectDB()
//test

const app = express();

app.set('port', 4000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({origin:"*"}))

app.use('/api', userRoute)
app.use('/api/employee', employeeRoute)


app.listen(app.get('port'),()=>{
    console.log(`servidor escuchando en el puerto ${app.get('port')}`)
})
