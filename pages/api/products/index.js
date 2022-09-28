import dbConnect from "../../../lib/mongoConnection";
import getMethod from "./functions";

export default async function handler(req, res){
    const { method } = req;

    dbConnect();

    await getMethod(method, req, res)

}