import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const Edit_product=(props)=>{
    const {id}=useParams()
    const navigate=useNavigate()
    const [product,setProduct]=useState([])

    useEffect(()=>{
    axios.get(`http://localhost:4000/editproduct/${id}`)
            .then((res)=>setProduct(res.data))
            .catch((error)=>console.log(error))
    },[])

    const [productname,setProductname]=useState(product.productname)

    const [description,setDescription]=useState(product.description)
    const [stock,setStock]=useState(product.stock)
    const [oldpurchaseprice,setOldpurchaseprice]=useState(product.oldpurchaseprice)
    const [newpurchaseprice,setNewpurchaseprice]=useState(product.newpurchaseprice)

    const [sellingprice,setSellingprice]=useState(product.sellingprice)
    const [sellername,setSellername]=useState(product.sellername)
    const [selleremail,setSelleremail]=useState(product.selleremail)
    
    

    


const handlesave=()=>{
    axios.put(`http://localhost:4000/editproduct/${id}`,{
        productname,
        description,
        stock,
        oldpurchaseprice,
        newpurchaseprice,
        sellingprice,
        sellername,
        selleremail
    }).then((res)=>{console.log(res)})
    .catch((error)=>console.log(error))
    alert("updatedsuccessfully")
    navigate("/getproduct")
    

}


return(

    <>





        <Link to={"/getproduct"}><button className="btn btn-primary">back</button></Link>
        
        <Card style={{ width: '58rem' }} className="container">

<h3>edit page</h3>
<form onSubmit={handlesave}>
    <br/>
    <table>
        
  <div className="form-group "><tr>
   <td> <label className="" for="productname"><b>productname :</b></label></td>
   <td> <input  type="text" onChange={(e)=>setProductname(e.target.value)} className="form-control" id="productname" placeholder="productname" defaultValue={product.productname} /></td>
   </tr></div>
  <br/>
  
  <div className="form-group "><tr>
   <td> <label className="" for="productid"><b>product id:</b></label></td>
   <td> <input  type="text"  className="form-control" id="productid" placeholder="productid" value={product.productid} disabled/></td>
   </tr></div>
  <br/>

  <div className="form-group">
    <label for="description"><b>description:</b></label>
    <textarea rows="2" cols="30" type="text" onChange={(e)=>setDescription(e.target.value)} className="form-control" id="description" placeholder="description" defaultValue={product.description}/>
  </div>
  <br/>
  
  <div className="form-group "><tr>
   <td> <label className="" for="stock"><b>stock:</b></label></td>
   <td> <input  type="text" onChange={(e)=>setStock(e.target.value)} className="form-control" id="stock" placeholder="stock" defaultValue={product.stock}/></td>
   </tr></div>
  <br/>

  <div className="form-group "><tr>
   <td> <label className="" for="oldpurchaseprice"><b>old purchase price:</b></label></td>
   <td> <input  type="number" onChange={(e)=>setOldpurchaseprice(e.target.value)} min={0} className="form-control" id="oldpurchaseprice" placeholder="oldpurchaseprice" defaultValue={product.oldpurchaseprice}/></td>
   </tr></div>
  <br/>

  <div className="form-group "><tr>
   <td> <label className="" for="newpurchaseprice"><b>new purchase price:</b></label></td>
   <td> <input  type="number" onChange={(e)=>setNewpurchaseprice(e.target.value)} min={0} className="form-control" id="newpurchaseprice" placeholder="newpurchaseprice" defaultValue={product.newpurchaseprice}/></td>
   </tr></div>
  <br/>

  <div className="form-group "><tr>
   <td> <label className="" for="sellingprice"><b>selling price:</b></label></td>
   <td> <input  type="number" onChange={(e)=>setSellingprice(e.target.value)} min={0} className="form-control" id="sellingprice" placeholder="sellingprice" defaultValue={product.sellingprice}/></td>
   </tr></div>
  <br/>

  <div className="form-group "><tr>
   <td> <label className="" for="sellername"><b>seller name:</b></label></td>
   <td> <input  type="text" onChange={(e)=>setSellername(e.target.value)} className="form-control" id="sellername" placeholder="sellername" defaultValue={product.sellername}/></td>
   </tr></div>
  <br/>

  <div className="form-group "><tr>
   <td> <label className="" for="sellermail"><b>seller mail:</b></label></td>
   <td> <input  type="text" onChange={(e)=>setSelleremail(e.target.value)} className="form-control" id="sellermail" placeholder="sellermail" defaultValue={product.selleremail}/></td>
   </tr></div>
  <br/>

  
  <button type="submit" className="btn btn-primary" >submit edit</button>
  </table>
</form>

   </Card>
    </>
)
}
export default Edit_product;