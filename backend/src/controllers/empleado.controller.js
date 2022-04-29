import { EmpleadoModel } from "../models/empleado.model.js"
import message from '../utils/message.js'
const {messageGeneral} = message

const empleadoCtrl = {}

// No se usa desde el frontend
empleadoCtrl.listAllEmployees = async(req,res)=>{
    try {
        const resp = await EmpleadoModel.find().populate(
        {
            path:"usuario",
            select:"-password" //no traemos este dato
        })
        messageGeneral(res,200,true,resp,"Lista de Empleados")
    } catch (error) {
        messageGeneral(res,500,false,"",error.message)                        
    }
}

empleadoCtrl.createEmployee = async(req,res)=>{
    try {
        const data = req.body
        const resp = await EmpleadoModel.create(data);
        messageGeneral(res,201,true,resp,"Empleado creado");
        
    } catch (error) {
        messageGeneral(res,500,false,"",error.message)                        
    }
}

export default empleadoCtrl