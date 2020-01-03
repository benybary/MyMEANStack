const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define schema and collection
let Employee = new Schema({
    name: {
        type: String
    },
    email:{
        type: String
    },
    department: {
        type: String
    },
    mobile: {
        type: Number
    }
} );

module.exports = mongoose.model('Employee', Employee, 'employees')