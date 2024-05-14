import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Saleofproduct=()=>{
const navigate=useNavigate()
const{id}=useParams();
const[product,setProduct]=useState([])
const[buyername,setBuyername]=useState("")
const[buyermail,setBuyermail]=useState("")
const[sellingprice,setSellingprice]=useState(0)
const[salesunits,setSalesunits]=useState(0)

useEffect(()=>{
    axios.get(`http://localhost:4000/sales/${id}`)
    .then((res)=>setProduct(res.data) )
    .catch((error)=>console.log(error))
})

const handlesale=(id)=>{
    axios.put(`http://localhost:4000/sales/${id}`,{buyername,buyermail,sellingprice,salesunits})
    .then((res)=>console.log(res))
    .catch((error)=>console.log(error))
    alert("sale successfull")
    navigate("/getproduct")


}

    return(
        <>
<Link to={"/getproduct"}><button className="btn btn-primary">back</button></Link>
<br/>
<Card style={{ width: '58rem' }} className="container">
<h1> Sale of product</h1>
      <Card.Body>
        <table>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>produuct name:</th>
                <td style={{border:"2px solid gray"}}><h3>{product.productname}</h3></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>available stock</th>
                <td style={{border:"2px solid gray"}}>{product.stock} units</td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>old purchase price</th>
                <td style={{border:"2px solid gray"}}>Rs. {product.oldpurchaseprice}</td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>new purchase price</th>
                <td style={{border:"2px solid gray"}}>Rs. {product.newpurchaseprice}</td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>selling price</th>
                <td style={{border:"2px solid gray"}}>Rs. {product.sellingprice}</td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>seller name:</th>
                <td style={{border:"2px solid gray"}}>{product.sellername}</td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>seller email:</th>
                <td style={{border:"2px solid gray"}}>{product.selleremail}</td>
            </tr>
            </table>
<div className="container">
<h3> description</h3><h5>{product.description}</h5>
</div>
<br/>
<form onSubmit={()=>handlesale(id)}>
                <table>
            <tr style={{border:"2px solid gray"}}>
            <th style={{border:"2px solid gray"}}><label for="buyername">buyer name</label></th>
                <td style={{border:"2px solid gray"}}><input onChange={(e)=>setBuyername(e.target.value)} type="text" id="buyername" placeholder="buyername" required/></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}><label  for="buyermail">buyer mail</label></th>
                <td style={{border:"2px solid gray"}}><input onChange={(e)=>setBuyermail(e.target.value)} type="text" id="buyermail" placeholder="buyermail" required/></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}><label  for="sellingprice">selling price</label></th>
                <td style={{border:"2px solid gray"}}><input onChange={(e)=>setSellingprice(e.target.value)} min={0} type="number" id="sellingprice" placeholder="sellingprice" required/></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}><label  for="salesunits">sales units</label></th>
                <td style={{border:"2px solid gray"}}><input onChange={(e)=>setSalesunits(e.target.value)} min={0} type="number" id="salesunits" placeholder="salesunits" required/></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <td style={{border:"2px solid gray",textAlign:"center"}} colSpan={4}><button className="btn btn-primary" type="submit">confirm sale</button></td>
            </tr>
            </table>
            </form>

</Card.Body>
</Card> 





        </>
    )
}

export default Saleofproduct;