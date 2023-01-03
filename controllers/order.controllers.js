const mongoose = require("mongoose");

const Order = require("../models/order.model");
const shoes = require("../models/shoes.model");


exports.orders_get_all = async(req, res, next) => {
  let docs;
  try{
     docs=await Order.find({}).populate('product',{'title':1,'quantity':1 })
  
    console.log(docs)
     res.status(200).send({docs});
  }catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};
 /* Order.find()
    .populate('product', 'name')
    .then(docs => {
      console.log(docs);
      res.status(200).json({
        count  : docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .
};*/

exports.orders_create_order = (req, res, next) => {
  shoes.findById(req.body.shoesId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.shoesId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_get_order = async(req, res, next) => {
try{
  const order=await Order.findById(req.params.orderId)
  .populate('product')
  
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }
    res.status(200).json({
      order: order,
      request: {
        type: "GET",
        url: "http://localhost:3000/orders"
      }
    });
    const _id=order.product._id;
    let q1=order.quantity;
    let q2=order.product.quantity;
    quantity=q1+q2;
    let updates= {"quantity":quantity}
    runUpdate(_id, updates, res);
    
}catch(err){
  res.status(500).json({
    error: err
  });
}
};
async function runUpdate(_id, updates, res) {
  try {
    const result = await shoes.updateOne(
      {
        _id: _id
      },
      {
        $set: updates
      },
      {
        upsert: true,
        runValidators: true
      }
    );

    
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
}

exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
