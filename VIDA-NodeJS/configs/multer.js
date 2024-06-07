import multer from "multer"
import path from "path"

//Confguracion de almacenamiento de multer
const storage = multer.memoryStorage()

//Configurar multer 
const upload = multer({storage})

export default upload