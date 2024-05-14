import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"



export const Home =()=>{

const[products,setProducts]=useState([])
const[worthofproduct,setWorthofproduct]=useState(0)



useEffect(()=>{
    axios.get("http://localhost:4000/home")
    .then((res)=>setProducts(res.data))
    .catch((error)=>console.log(error))
})

useEffect(()=>{
    let  worth=0
    products.map((product)=>{
worth+=product.stock*product.oldpurchaseprice
    })
    setWorthofproduct(worth)
})



    return(
        <>
        <div class="container">
            <br></br>
        <div className="row" >
        <div  className="mark1 col-3 mr-auto" style={{border:"solid 2px gray"}}> we have <spam> {products.length}</spam> products </div>
        <div className=" mark2 col-3" style={{border:"solid 2px gray"}}> our total worth of product is:<spam> Rs. {worthofproduct}</spam></div>
        <br></br>
        <div className="row" >

            <div className="mark3 col mr-auto" style={{border:"solid 2px gray"}}>A warehouse is a critical component of the supply chain, serving as a central hub for the storage, handling, and distribution of goods. It plays a pivotal role in ensuring the smooth flow of products from manufacturers to retailers and ultimately to end consumers. Warehouses come in various sizes and configurations, ranging from small facilities to vast distribution centers, each tailored to meet the specific needs of the business.

</div>
        </div>

 
        </div>
            <br></br>
            <img className="message" width="95%" height="300px" src="https://media.istockphoto.com/id/1500771927/photo/big-warehouse.webp?b=1&s=170667a&w=0&k=20&c=2FPHm-QcDcIM1mxxQLHjpXbNoUccKpyjIVBrZ-mD4QM="></img>
            <br></br>

<br></br>
<h1>use this button to continue your seamless inventory managaement</h1>
        <div className="row" >
            <Link to="/addproduct" class="btnlink col-2 btn btn-primary">add product</Link>
            <Link to="/getproduct" class="btnlink col-2 btn btn-primary">get product</Link>
            <Link to="/purchasehistory"  class="btnlink col-2 btn btn-primary">purchase history</Link>
            <Link to="/saleshistory" class="btnlink col-2 btn btn-primary">sales history</Link>



        </div>

            
            



        </div>
        </>
    )
}