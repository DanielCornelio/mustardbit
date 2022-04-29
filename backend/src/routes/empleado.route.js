import {Router} from "express";
import empleadoCtrl from "../controllers/empleado.controller.js";

const route = Router()

route.get('/',empleadoCtrl.listAllEmployees)
route.post('/',empleadoCtrl.createEmployee)




export default route