import { EmpleadoModel } from "../models/empleado.model.js"
import message from '../utils/message.js'
const { messageGeneral } = message

const empleadoCtrl = {}

// No se usa desde el frontend
empleadoCtrl.listAllEmployees = async(req, res) => {
    try {
        const resp = await EmpleadoModel.find().populate({
            path: "usuario",
            select: "-password" //no traemos este dato
        })
        messageGeneral(res, 200, true, resp, "Lista de Empleados")
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}


empleadoCtrl.createEmployee = async(req, res) => {
    try {
        const data = req.body
        const resp = await EmpleadoModel.create({...data, usuario:req.userid});
        messageGeneral(res, 201, true, resp, "Empleado creado");

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}

empleadoCtrl.listById = async(req, res) => {
    try {
        const { id } = req.params;
        const resp = await EmpleadoModel.findById(id)
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Empleado No encontrado")
        }
        messageGeneral(res, 200, true, resp, "")
    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}

empleadoCtrl.listEmployeeBoss = async(req, res) => {
    try {
        // const { id } = req.params;
        const resp = await EmpleadoModel.find({ usuario: req.userid }).populate({
            path: "usuario",
            select: "-password" //no traemos este dato
        })
        messageGeneral(res, 200, true, resp, "")

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}

empleadoCtrl.deleteEmployee = async(req, res) => {
    try {
        const { id } = req.params;
        const resp = await EmpleadoModel.findById(id)
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Empleado No encontrado")
        }
        await resp.deleteOne()
        messageGeneral(res, 200, true, "", "Empleado Eliminado")

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}

empleadoCtrl.updateEmployee = async(req, res) => {
    try {
        const { id } = req.params;
        const resp = await EmpleadoModel.findById(id)
        if (!resp) {
            return messageGeneral(res, 404, false, "", "Empleado No encontrado")
        }
        await resp.updateOne(req.body)
        messageGeneral(res, 200, true, "", "Empleado Actualizado")

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)
    }
}

empleadoCtrl.searchEmployee = async(req, res) => {
    try {
        const { nombres } = req.params
        const resp = await EmpleadoModel.find({
            nombres: { $regex: ".*" + nombres + ".*" },
            usuario: req.userid
        })
        messageGeneral(res, 200, true, resp, "")

    } catch (error) {
        messageGeneral(res, 500, false, "", error.message)

    }
}

export default empleadoCtrl