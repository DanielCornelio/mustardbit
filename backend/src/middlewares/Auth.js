import { UserModel } from "../models/usuario.model.js";
import jwt from 'jsonwebtoken'
import messages from "../utils/message.js";
const { messageGeneral } = messages
// auth
export const verificarToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return messageGeneral(res, 401, false, null, "You are not authorized to acces this resource 1")
    }
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return messageGeneral(res, 401, false, null, "You are not authorized to acces this resource 2")
    }

    jwt.verify(token, "secreta", async(error, payload) => {
        if (error) {
            return messageGeneral(res, 401, false, null, "You are not authorized to acces this resource 3")
        }
        const { _id } = payload
        const resp = await UserModel.findById(_id)
        if (!resp) {
            return messageGeneral(res, 401, false, null, "You are not authorized to acces this resource 4")
        }
        req.userid = _id
        next()
    })
}