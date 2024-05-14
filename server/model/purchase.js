const mongoose=require("mongoose")
const purchaseSchema=new mongoose.Schema({
    sellername:{
        type:String,
        require:true
    },
    selleremail:{
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
    purchaseprice:{
        type:Number,
    },
    purchaseunits:{
        type:Number,
        require:true
    },
    purchasedate:{
        type:String,
        require:true
    }
   


})
const Purchase=mongoose.model('purchase',purchaseSchema)
module.exports =Purchase;