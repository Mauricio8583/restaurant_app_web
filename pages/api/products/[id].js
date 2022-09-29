import dbConnect from "../../../lib/mongoConnection";
import { getMethodByID } from "./functions";

export default async function handler(req, res){
    const { method, query: {id} } = req;

    dbConnect();

    await getMethodByID(method, id, req, res);

}