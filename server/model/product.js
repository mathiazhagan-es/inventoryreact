const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({

   productname:{
    type:String,
   },
   productid:{
    type:String,
   },
   description:{
    type:String,
   },
   stock:{
    type:Number,
   },
   oldpurchaseprice:{
    type:Number,
   },
   newpurchaseprice:{
      type:Number,
     },
     sellingprice:{
      type:Number,
     },

   sellername:{
    type:String,
   },
   selleremail:{
    type:String,
   }
    
})
const Product=mongoose.model('product',productSchema)
module.exports =Product;