const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');
const config = require('../config/database');

 //lab Schema
 const LabSchema = mongoose.Schema({
    // lname: {
    //     type: String,
    //     required: true
    // },

    username: {
        type: String,
        required: true
    },
    lab: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    tslot: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }

});

const Lab = module.exports = mongoose.model('Lab', LabSchema);

module.exports.addLab = function(newLab, callback){
    
    newLab.save(callback);

}

//view all
module.exports.getLabs = function({}, callback){
    Lab.find({},callback);
}

//view for profile
module.exports.getLabByUsername = function(username, callback){
    const query = {username: username}
    Lab.find(query, callback);
}

//get lab by id
module.exports.getLabById = function(id,callback){
    Lab.findById(id,callback);
}

//edit reservation
module.exports.editReservation = function(id,upReservation,callback){
   // console.log('this is model');
   // console.log(upReservation);
    const query = {_id: id};
    Lab.update(query,upReservation,callback);

}

module.exports.getResbyDateLab = function(rDate,rLab,callback){
    const query = {date:rDate, lab:rLab};
    Lab.find(query,callback);
}

module.exports.getLabByDate = function(rDate,callback){
    const query = {date:rDate};
    Lab.find(query,callback);
}