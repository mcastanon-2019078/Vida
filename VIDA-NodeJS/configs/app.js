//Imports
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import alertRoutes from '../src/alerta/alerta.routes.js'

//Configuration
const app = express()
config()

const port = process.env.PORT || 3200

//Configurating the server 
//(Configurando el servidor de express)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Acepta o reniega las solicitudes.
app.use(helmet()) //Seguridad
app.use(morgan('dev'))

//Routes
app.use(alertRoutes)


app.use('/api', alertRoutes)

//Levantamos el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)

}