import Order from '../../../models/Order'

export async function getOrder(method, req, res){
    if(method === 'POST'){
        try{
            const order = await Order.create(req.body);
            res.status(201).json(order);
        }catch(err){
            res.status(500).json({message: err});
        }
    }
    if(method === 'GET'){
        try{
            const orders = await Order.find()
            res.status(200).json(orders);
        }catch(err){
            res.status(500).json({message: err});
        }
    }
}

export async function getOrderbyID(method, id, req, res){
    if(method === 'POST'){
        try{
            const order = await Order.create(req.body);
            res.status(201).json(order);
        }catch(err){
            res.status(500).json({message: err});
        }
    }
    if(method === 'GET'){
        try{
            const order = await Order.findById(id);
            res.status(200).json(order);
        }catch(err){
            res.status(500).json({message: err});
        }
    }
}