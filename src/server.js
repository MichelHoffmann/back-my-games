import express, { Router } from "express";

import publicRoutes from "./routes/public.js";

const app = express();

app.use(express.json());
app.use("/", publicRoutes);

app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});



/// username
/// michoffjr


///password
/// ms051Tk6zq5G2MpJ

///    mongodb+srv://michoffjr:ms051Tk6zq5G2MpJ@back-my-games.kc0e8.mongodb.net/?retryWrites=true&w=majority&appName=back-my-games