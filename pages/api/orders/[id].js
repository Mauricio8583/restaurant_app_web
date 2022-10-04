import dbConnect from "../../../lib/mongoConnection";
import Order from "../../../models/Order"
import { getOrderbyID } from "./functions";

const handler = async (req, res) => {
    const {method, query: {id} } = req;

    await dbConnect();

    await getOrderbyID(method, id, req, res)
}

export default handler