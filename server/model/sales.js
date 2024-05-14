const mongoose=require("mongoose")
const salesSchema=new mongoose.Schema({
    buyername:{
        type:String,
        require:true
    },
    buyermail:{
        type:String,
        require:true
    },
    productname:{
        type:String,
        require:true
    },
    productid:{
        type:String,
        require:true
    },
    sellingprice:{
        type:Number,
        require:true
    },
    salesunits:{
        type:Number,
        require:true
    },
    sellingdate:{
        type:String,
        require:true
    }
    



})

const Sales=mongoose.model('sales',salesSchema)
module.exports =Sales;