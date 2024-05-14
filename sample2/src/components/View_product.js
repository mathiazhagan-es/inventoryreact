import axios from "axios"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';




const View_product=()=>{

const[product,setProduct]=useState([])
    const {id}=useParams()

    useEffect(()=>{
        axios.get(`http://localhost:4000/getproducts/${id}`)
        .then((res)=>setProduct(res.data))
        .catch((error)=>console.log(error))
    },[])

    return(
        <>
        <Link to={"/getproduct"}><button className="btn btn-primary">back</button></Link>
    <br/>
<Card style={{ width: '58rem' }} className="container">
<h1> view product</h1>
      <Card.Body>
        <table>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>produuct name:</th>
                <td style={{border:"2px solid gray"}}><h3>{product.productname}</h3></td>
            </tr>
            <tr style={{border:"2px solid gray"}}>
                <th style={{border:"2px solid gray"}}>produuct id:</th>
                <td style={{border:"2px solid gray"}}>{product.productid}</td>
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
            <Card.Body>
        <Card.Link href={`/editproduct/${product._id}`}><button className="btn btn-primary">Edit</button></Card.Link>
        <Card.Link href={`/purchaseproduct/${product._id}`}><button className="btn btn-primary">Purchase</button></Card.Link>
        <Card.Link href={`/sales/${product._id}`}><button className="btn btn-primary">Sales</button></Card.Link>

      </Card.Body>

            </Card.Body>

    </Card>



       



    






        
        </>
    )


}
export default View_product;