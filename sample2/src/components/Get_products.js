import {  useEffect, useState } from "react"
import axios from "axios"
import { createContext } from "react";
import Getproductminicomp from "./Getproductminicomp";
import { Link } from "react-router-dom";
import logo from "../img/getproduct.avif"

const Searchcontext=createContext();
export default Searchcontext;


export const Get_products=()=>{

const[products,setProducts]=useState([])
const[searchstring,setSearchstring]=useState("")
const[nameass,setNameass]=useState(false)
const[stockass,setStockass]=useState(false)
const[purpriceass,setPurpriceass]=useState(false)
const[worthofproduct,setWorthofproduct]=useState(0)


    useEffect(()=>{
        axios.get("http://localhost:4000/getproducts")
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

   
function handlesort({one,two,three,four}){
    one(!two);
    three(false);
    four(false)
}
    




    return(

        <>
                <Link  to={"/"}><button className="btn btn-primary">back</button></Link>

        <div className="container">
            <div className="row" >
        <div  className="mark1 col-3 mr-auto" style={{border:"solid 2px gray"}}> we have <spam> {products.length}</spam>  products </div>
        <div className=" mark2 col-3" style={{border:"solid 2px gray"}}> our total worth of product is:<spam> Rs. {worthofproduct}</spam></div>
        <div className="col-3" ><Link to={"/addproduct"} className="btn btn-primary" style={{marginTop:"30px",marginLeft:"40%"}}>add new product</Link></div>
 
        </div>
        <br/>
        <div className="message"><img src={logo} width="95%" height="300px"/></div>
        <br/>

  



        <div className="row">
<label className="col-2  col-sm-2 col-md-1 col-lg-1 col-xl-1 "  for="search"><b>search</b></label>
<input className="col-4" id="search" onChange={(e)=>setSearchstring(e.target.value)} type="text" placeholder="search by product name"/><br/>
</div><br/>
        <div className="row">
        <button  onClick={()=>handlesort({one:setNameass,two:nameass,three:setStockass,four:setPurpriceass})} style={{margin:"2px"}}  className={nameass ?"btn btn-success col-3":"btn btn-primary col-3"}>ascending order of product name</button>
        <button  onClick={()=>handlesort({one:setStockass,two:stockass,three:setNameass,four:setPurpriceass})} style={{margin:"2px"}} className={stockass ?"btn btn-success col-3":"btn btn-primary col-3"}>ascending order of stock</button>
        <button  onClick={()=>handlesort({one:setPurpriceass,two:purpriceass,three:setNameass,four:setStockass})} style={{margin:"2px"}} className={purpriceass ?"btn btn-success col-3":"btn btn-primary col-3"}>ascending order of purchaseprice</button>
        </div>
        <br/>

       <Searchcontext.Provider value={{products,searchstring,nameass,stockass,purpriceass}}>
<Getproductminicomp />
        </Searchcontext.Provider>
        </div>
        </>
    )
}