const express=require("express")
const mongoose=require("mongoose")
const uniqid=require("uniqid")
const cors= require("cors")
const date = require('date-and-time');
const now = new Date();


const app=express()
app.use(express.json())
app.use(cors())


const Product =require(".//model/product")
const Purchase =require(".//model/purchase")
const Sales =require(".//model/sales")




mongoose.connect("mongodb://127.0.0.1:27017/inventory")


app.post('/addproduct',async(req,res)=>{
    const purchasedate=date.format(now, 'DD/MM/YYYY');
    const productid=uniqid()
    const{productname,description,stock,oldpurchaseprice,sellingprice,sellername,selleremail}=req.body;
await Product.insertMany({productname,description,stock,oldpurchaseprice,sellingprice,sellername,selleremail,productid,onstock:true})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
await Purchase.insertMany({productname,productid,sellername,selleremail,purchaseprice:oldpurchaseprice,purchaseunits:stock,purchasedate})
})
app.get('/getproducts',async(req,res)=>{
    
    await Product.find()
    .then(result=>res.json(result))
    .catch(error=>res.json(error))

})
app.get('/getproducts/:id',async(req,res)=>{
    const {id}=req.params
    await Product.findById({_id:id})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})
app.delete("/deleteproduct/:id",async(req,res)=>{
    const {id}=req.params
    await Product.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})
app.get("/editproduct/:id",async(req,res)=>{
    const {id}=req.params
    await Product.findById({_id:id})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})
app.put("/editproduct/:id",async(req,res)=>{
    const {id}=req.params
    const{productname,
        description,
        stock,
        oldpurchaseprice,
        newpurchaseprice,
        sellingprice,
        sellername,
        selleremail}=req.body
        await Product.findByIdAndUpdate(id,{productname,
            description,
            stock,
            oldpurchaseprice,
            newpurchaseprice,
            sellingprice,
            sellername,
            selleremail})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))

})

app.get("/purchaseproduct/:id",async(req,res)=>{
    const {id}=req.params;
    await Product.findById({_id:id})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})
app.put("/purchaseproduct/:id",async(req,res)=>{
    const purchasedate=date.format(now, 'DD/MM/YYYY');
    const {id}=req.params;
    const{newpurchsestock,new_purchase_price}=req.body
    const{stock,sellername,selleremail,productname,productid,newpurchaseprice}=await Product.findById({_id:id})
    const newstock = parseInt(stock) + parseInt(newpurchsestock)
    await Product.findByIdAndUpdate({_id:id},{stock:newstock,oldpurchaseprice:newpurchaseprice,newpurchaseprice:new_purchase_price})
    await Purchase.insertMany({sellername,selleremail,productname,productid,purchaseprice:new_purchase_price,purchaseunits:newpurchsestock,purchasedate})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})

app.get("/purchasehistory",async(req,res)=>{
    await Purchase.find()
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})
app.put("/sales/:id",async(req,res)=>{
    const sellingdate=date.format(now, 'DD/MM/YYYY');
    const{id}=req.params
    const {buyername,buyermail,sellingprice,salesunits}=req.body
    const{stock,sellername,selleremail,productname,productid,newpurchaseprice}=await Product.findById({_id:id})
    
    const newstock= parseInt(stock) - parseInt(salesunits)

    await Product.findByIdAndUpdate({_id:id},{stock:newstock})
    await Sales.insertMany({buyername,buyermail,sellingprice,salesunits,productname,productid,sellingdate})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))


})
app.get("/sales/:id",async(req,res)=>{
    const{id}=req.params
    await Product.findById({_id:id})
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})
app.get("/saleshistory",async(req,res)=>{
    await Sales.find()
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})

app.get("/home",async(req,res)=>{
    await Product.find()
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})

app.listen("4000",()=>{
    console.log("server connected")
})
