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

///    mongodb+srv://michoffjr:ms051Tk6zq5G2MpJ@back-my-games.kc0e8.mongodb.net/michoffjr?retryWrites=true&w=majority&appName=back-my-games

///JWR Secret Key
///   6318b4b454aae41f35e4c4cbcde4118fb4cb48c895e10f0cc01775fff8228a2d
