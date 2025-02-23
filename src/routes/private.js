import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient

router.get('/listar-usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json({message: "Usuarios listados com sucesso!", users})
    } catch (error) {
        res.status(500).json({message: "Erro no servidor!"})
    }
})

export default router 