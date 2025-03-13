const Orders = require('../models/Orders');

exports.newOrders = async (req, res,next) => {
    const order = new Orders(req.body);

    try {
        await order.save();
        res.json({message: 'Order added successfully'});
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.showOrders = async (req, res,next) => {
    try {
        const orders = await Orders.find({}).populate('client').populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.showOrdersById = async(req,res,next) => {
    const orders = await Orders.findById(req.params.id).populate('client').populate({
            path: 'products.product',
            model: 'Products'
        });
    if(!orders) {
        res.json({message: 'Order not found'});
        return next();
    }
    res.json(orders);
}


exports.updateOrders = async(req, res,next) => {
    try {
        let order = await Orders.findOneAndUpdate({_id : req.params.id},req.body,{new:true}).populate('client').populate({
            path: 'products.product',
            model: 'Products'
        });;
        res.json(order);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteOrders = async(req,res,next) => {
    try {
        await Orders.findOneAndDelete({_id: req.params.id});
        res.json({message: 'Client deleted successfully'});
    } catch (error) {
        console.log(error);
        next();
    }
}