const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const customer = new Schema({
     name: {
        type: String
    },
     email: {
        type: String,
        unique: true,
        require:true

    },
     password: {
        type: String,
        require:true
    },
     cpassword: {
        type: String
     }
});

customer.plugin(mongoosePaginate);

customer.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }
// User.index({'$**': 'text'});

module.exports = mongoose.model("customer", customer);


