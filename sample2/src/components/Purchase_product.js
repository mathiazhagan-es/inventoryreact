import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



const Purchase_product=()=>{
    const {id}=useParams()
    const [product,setProduct]=useState([])
    const [stock,setStock]=useState(0)
    const [purchaseprice,setPurchaseprice]=useState(0)
    const navigate=useNavigate()




    useEffect(()=>{
        axios.get(`http://localhost:4000/purchaseproduct/${id}`)
        .then((res)=>setProduct(res.data))
        .catch((error)=>console.log(error))
    })

    const handlepurchase=(id)=>{
        console.log(stock,purchaseprice)
        axios.put(`http://localhost:4000/purchaseproduct/${id}`,{newpurchsestock:stock,new_purchase_price:purchaseprice})
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))
        alert("purchase successfull")
        navigate("/getproduct")

    }



    return(
        <>

<Link to={"/getproduct"}><button className="btn btn-primary">back</button></Link>
<br/>
<Card style={{ width: '58rem' }} className="container">
<h1> purchase of product</h1>
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
            <form onSubmit={()=>handlepurchase(id)}>
                <table>
            <tr style={{border:"2px solid gray"}}>
            <th style={{border:"2px solid gray"}}><label for="stock">purchasing units</label></th>
                <td style={{border:"2px solid gray"}}><input onChange={(e)=>setStock(e.target.value)} min={0} type="number" id="stock" placeholder="purchasing units" required/></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}><label  for="purchaseprice">purchasing price</label></th>
                <td style={{border:"2px solid gray"}}><input onChange={(e)=>setPurchaseprice(e.target.value)} min={0} type="number" id="purchaseprice" placeholder="purchase price" required/></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <td style={{border:"2px solid gray",textAlign:"center"}} colSpan={2}><button className="btn btn-primary" type="submit">confirm purchasse </button></td>
            </tr>
            </table>
            </form>

            </Card.Body>

    </Card>







        </>
    )
}
export default Purchase_product;