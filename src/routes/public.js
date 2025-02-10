import express from 'express'
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router()

router.post('/cadastro', async (req, res) => {
    const user = req.body

    await prisma.user.create 

    res.status(201).json(user)
})

export default router