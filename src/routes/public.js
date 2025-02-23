import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(user.password, salt);

    const userDb = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });

    res.status(201).send(userDb);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente novamente!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password);

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
