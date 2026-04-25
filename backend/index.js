import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { checkDBConnection } from "./src/utils/dbHealthCheck.js"
import router from "./src/routes/todo.routes.js"
import { _route } from "./src/routes/auth.routes.js"

dotenv.config()
const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json())

app.use("/auth", _route)
app.use("/", router)

const startServer = async () => {
  const isDBConnected = await checkDBConnection()
  if (!isDBConnected) {
    console.log("Server not started due to DB connection failure")
    process.exit(1)
  }
  const PORT = process.env.PORT || 9999
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
}
startServer()
