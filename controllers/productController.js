const Products = require('../models/Products');
const multer = require('multer');
const shortid = require('shortid');
const { unlink } = require('fs');


const configuracionMulter = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('image');

exports.uploadImage = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.status(400).json({ message: error.message });
        } else {
            next();
        }
    });
};

exports.newProduct = async (req, res,next) => {
    const product = new Products(req.body);
    
    try {
        if(req.file && req.file.filename) {
            product.image = req.file.filename;
        }
        await product.save();
        res.json({message: 'Product added successfully'});
    } catch (error) {
        console.log(error);
        next();
    }
};


exports.showProducts = async (req, res,next) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.showProductById = async(req, res,next) => {
    const product = await Products.findById(req.params.id);
    if(!product) {
        res.json({message: 'Product not found'});
        return next();
    }

    res.json(product);
}

exports.updateProduct = async(req, res,next) => {
    try {
        let oldProduct = await Products.findById(req.params.id);

        let newProduct = req.body;

        if(req.file){
            newProduct.image = req.file.filename;
            const oldImagePath = __dirname+`/../uploads/${oldProduct.image}`
            unlink(oldImagePath, (error) => {
                if (error) {
                return console.log(error)
                }
            })
        } else {
            newProduct.image = oldProduct.image;
        }

        let product = await Products.findByIdAndUpdate({_id : req.params.id},newProduct,{new:true});
        res.json(product);

    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteProduct = async(req,res,next) => {
    try {
        await Products.findOneAndDelete({_id: req.params.id});
        res.json({message: 'Product deleted successfully'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.searchProduct = async(req,res,next) => {
    try {
        const { query} = req.params;
        const product = await Products.find({ name: new RegExp(query, 'i')});
        res.json(product);
    } catch (error) {
        console.log(error);
        next();
    }
}