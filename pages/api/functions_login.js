import cookie from 'cookie';

export function getMethodLogin(req, res){
    const {username, password} = req.body;

    if(req.method === 'POST') {
        if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            res.setHeader("Set-Cookie", cookie.serialize("token", process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/"
            }));
           return res.status(200).json("Acess Successful");
        }
    }
    else{
        return res.status(400).json("Wrong Credentials");
    }
}