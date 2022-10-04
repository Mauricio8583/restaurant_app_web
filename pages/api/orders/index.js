import dbConnect from "../../../lib/mongoConnection";
import Order from "../../../models/Order"
import { getOrder } from "./functions";

const handler = async (req, res) => {
    const {method} = req;

    await dbConnect();

    await getOrder(method, req, res)
}

export default handler