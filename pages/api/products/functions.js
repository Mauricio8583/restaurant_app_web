import Product from "../../../models/Product";

async function getMethod(method, req, res){
    if(method === "POST"){
        try{
            const product = await Product.create(req.body);
            return res.status(201).json(product);            
        }catch(err){
            return res.status(500).json(err)            
        }
    }
    if(method === "GET"){
        try{
            const products = await Product.find();
            return res.status(200).json(products);
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

export default getMethod