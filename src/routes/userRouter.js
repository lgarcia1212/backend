import { Router } from "express";
import { userModel } from "../models/user";

const userRouter = Router()

userRouter.get('/', (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    }catch(e) {
        res.status(500).send("Error al consultar Usuarios", e)
    } 

})

userRouter.post('/', async (req,res) => {
    try {
        const {nombre, apellido, email, edad, password} = req.body
        const resultado = await userModel.create(nombre, apellido, email, edad, password)
        res.status(200).send(resultado)
    }catch(e) {
        res.status(500).send("Error al crear Usuarios", e)
    } 
})

export default userRouter