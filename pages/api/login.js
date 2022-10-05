import { getMethodLogin } from "./functions_login"


const handler = (req, res) => {
    getMethodLogin(req, res)  
}

export default handler