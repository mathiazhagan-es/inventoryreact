import {  useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Card from 'react-bootstrap/Card';

export const Add_product=()=>{
    
    const [productname,setProductname]=useState("")
    const [description,setDescription]=useState("")
    const [stock,setStock]=useState(0)
    const [oldpurchaseprice,setOldpurchaseprice]=useState(0)
    const [sellingprice,setSellingprice]=useState(0)
    const [sellername,setSellername]=useState("")
    const [selleremail,setSelleremail]=useState("")
const navigate=useNavigate()


const handleadd=(e)=>{
    console.log("posted")
            axios.post("http://localhost:4000/addproduct",{productname,description,stock,oldpurchaseprice,sellingprice,sellername,selleremail})
            .then((result)=>console.log(result))
            .catch((error)=>console.log(error))
            alert("product added successfully")
            navigate("/getproduct")
}  
        
    

    
    return(
        
        <>
            <Link to={"/getproduct"}><button className="btn btn-primary">back</button></Link>
<Card style={{ width: '58rem' }} className="container">
            <div className="container">
<br/>
<h3>add new product</h3>
<br/>
<form onSubmit={handleadd}>
  <div class="form-group">
    <label for="formGroupExampleInput"><b>productname</b></label>
    <input type="text" onChange={(e)=>setProductname(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="productname"/>
  </div>
  <br/>
  <div class="form-group">
    <label for="formGroupExampleInput2"><b>description</b></label>
    <textarea rows="4" cols="50" type="text" onChange={(e)=>setDescription(e.target.value)} className="form-control" id="formGroupExampleInput2" placeholder="description"/>
  </div>
  <br/>
  <div class="form-group">
    <label for="formGroupExampleInput"><b>stock</b></label>
    <input onChange={(e)=>setStock(e.target.value)} type="number" min={0} className="form-control" id="formGroupExampleInput" placeholder="stock"/>
  </div><br/>
  <div class="form-group">
    <label for="formGroupExampleInput"><b>purchaseprice</b></label>
    <input onChange={(e)=>setOldpurchaseprice(e.target.value)} type="number" min={0} className="form-control" id="formGroupExampleInput" placeholder="purchaseprice"/>
  </div><br/>
  <div class="form-group">
    <label for="formGroupExampleInput"><b>sellingprice</b></label>
    <input onChange={(e)=>setSellingprice(e.target.value)} type="number" min={0} className="form-control" id="formGroupExampleInput" placeholder="sellingprice"/>
  </div><br/>
  <div class="form-group">
    <label for="formGroupExampleInput"><b>seller name</b></label>
    <input onChange={(e)=>setSellername(e.target.value)} type="text" className="form-control" id="formGroupExampleInput" placeholder="seller name"/>
  </div><br/>
  <div class="form-group">
    <label for="formGroupExampleInput"><b>seller mail</b></label>
    <input onChange={(e)=>setSelleremail(e.target.value)} type="text" className="form-control" id="formGroupExampleInput" placeholder="seller mail"/>
  </div><br/>
  <button type="submit" className="btn btn-primary" >add product</button>

</form>
</div>
</Card>








        
        
        </>

    )



    }