//Imports
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import alertRoutes from '../src/alerta/alerta.routes.js'
import userRouters from '../src/user/user.router.js'
import alertClientRoutes from '../src/alertaCliente/alertaCliente.routes.js'

//Configuration
const app = express()
app.use(
  cors({
    // credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:8081', 'http://localhost:2880'], // whatever ports you used in frontend
  })
);
config()

const port = process.env.PORT || 3200

//Configurating the server 
//(Configurando el servidor de express)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))
//app.use(express.json())
//app.use(cors()) //Acepta o reniega las solicitudes.

app.use(helmet()) //Seguridad
app.use(morgan('dev'))

//Routes
app.use('/alert', alertRoutes)
app.use('/alertClient', alertClientRoutes)
app.use(userRouters)

//Levantamos el servidor
export const initServer = () => {
  app.listen(port)
  console.log(`Server HTTP running in port ${port}`)

}