const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const shoes= new Schema({
     title: {
        type: String,
        require:true
    },
    category:{
        type: String,
        require:true
    },
     description: {
        type: String,
    },
     quantity: {
        type: Number,
        require:true
    },
      price: {
        type: Number,
        require:true
    },
    image_url: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
});

shoes.plugin(mongoosePaginate);

module.exports = mongoose.model("shoes", shoes);