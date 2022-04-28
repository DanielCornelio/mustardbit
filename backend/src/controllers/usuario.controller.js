import { User } from "../models/usuario.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {messageGeneral} from '../utils/message'
const userCtrl = {}

userCtrl.register = async (req, res) =>{
    try {
        const data = req.body
        // verificar que el correo no exista
        const resp = await User.findOne({correo:data.correo});
        if(resp){
            return messageGeneral(res,400,false,"","El correo ya existe")
        }
        // encriptar contraseña
        data.password = await bcrypt.hash(data.password,10);        
        const newUser = await User.create(data);
        // crear token
        const token = jwt.sign({_id:newUser._id},"secreta")

        res.status(201).json({
            ok:true,
            message: "Usuario creado correctamente",
            // data: newUser
            data:{...resp._doc,password:null,token}
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error.message
        })
    }
}

userCtrl.login = async (req, res)=>{
    try {
        const data= req.body;
        const resp = await User.findOne({correo:data.correo})
        if(!resp){
            return res.status(400).json({
                ok:false,
                message:"El correo no existe"
            });
        }
        const match = await bcrypt.compare(data.password, resp.password)
        if(match){
            // crear token
            const token = jwt.sign({_id:resp._id},"secreta")
            return res.status(201).json({
                ok:true,
                message: "Bienvenido",
                data:{...resp._doc, password:null,token}
            })
        }
        res.status(401).json({
            ok:false,
            message:"la contraseña es incorrecta"
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:error.message
        })
    }
}

export default userCtrl