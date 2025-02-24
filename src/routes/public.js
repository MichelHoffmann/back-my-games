import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

const userRegisterSchema  = z.object({
  name: z.string().min(3, 'nome deve ser string com no mínimo 3 caracteres'),
  email: z.string().email(),
  password: z.string().min(6),
})

const userLoginSchema  = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

router.post("/cadastro", async (req, res) => {
  try {
    const {name, email, password} = userRegisterSchema.parse(req.body)

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    

    const userDb = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    res.status(201).send(userDb);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
      return res.status(400).json({ message: "Dados inválidos", errors: error.errors });
    }
    
    console.log(error)
    res.status(500).json({ message: "Erro no servidor, tente novamente!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {email, password} = userLoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({ message: "Senha invalida!" });
    }

    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1m"})

    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor!" });
  }
});

export default router;
