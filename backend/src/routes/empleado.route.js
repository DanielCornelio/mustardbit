import { Router } from "express";
import empleadoCtrl from "../controllers/empleado.controller.js";
import { verificarToken } from "../middlewares/Auth.js";

const route = Router()

route.get('/', empleadoCtrl.listAllEmployees)

route.post('/', verificarToken, empleadoCtrl.createEmployee)
route.get('/listid/:id', empleadoCtrl.listById)
route.get('/listboss/:id', empleadoCtrl.listEmployeeBoss)
route.delete('/delete/:id', empleadoCtrl.deleteEmployee)
route.put('/update/:id', empleadoCtrl.updateEmployee)
route.get('/search/:id/:nombres', empleadoCtrl.searchEmployee)








export default route