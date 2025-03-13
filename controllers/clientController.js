const Clients = require('../models/Clients');

// Add new client
exports.newClient = async (req, res,next) => {
    const client = new Clients(req.body);

    try {
        await client.save();
        res.json({message: 'Client added successfully'});
    } catch (error) {
        res.send(error);
        next();
    }
}

// Shows all clients
exports.showClients = async (req, res,next) => {
    try {
        const clients = await Clients.find({});
        res.json(clients);
    } catch (error) {
        res.send(error);
        next();
    }
}

exports.showClientById = async(req, res,next) => {
    const client = await Clients.findById(req.params.id);

    if(!client) {
        res.json({message: 'Client not found'});
        return next();
    }

    res.json(client);
}

exports.updateClient = async(req, res,next) => {
    try {
        const client = await Clients.findByIdAndUpdate({_id : req.params.id},req.body,{new:true});
        res.json(client);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteClient = async(req,res,next) => {
    try {
        await Clients.findOneAndDelete({_id: req.params.id});
        res.json({message: 'Client deleted successfully'});
    } catch (error) {
        console.log(error);
        next();
    }
}