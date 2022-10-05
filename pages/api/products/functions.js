import Product from "../../../models/Product";

export async function getMethod(method, req, res){
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
            const product = await Product.find();
            return res.status(200).json(product);
        }catch(err){
            return res.status(500).json(err)
        }
    }
    
}


export async function getMethodByID(method, id, req, res){
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
            const product = await Product.findById(id);
            return res.status(200).json(product);
        }catch(err){
            return res.status(500).json(err)
        }
    }
    if(method === "PUT"){
        try{
            const product = await Product.findByIdAndUpdate(id);
            return res.status(200).json(product);            
        }catch(err){
            return res.status(500).json(err)            
        }
    }
    if(method === "DELETE"){
        try{
            await Product.findByIdAndDelete(id);
            return res.status(200).json("Product deleted");            
        }catch(err){
            return res.status(500).json(err)            
        }
    }
}

